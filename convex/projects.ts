import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// Helper: get user by tokenIdentifier
async function getUserByToken(ctx: { db: any; auth: any }) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q: any) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();
}

/**
 * Create a new project for the authenticated user.
 * Enforces Free tier 10-project limit.
 */
export const saveProject = mutation({
  args: {
    title: v.string(),
    diagramData: v.string(),
    thumbnailId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Enforce Free tier project limit
    const user = await getUserByToken(ctx);
    if (user && user.subscriptionTier === "free") {
      const existingProjects = await ctx.db
        .query("projects")
        .withIndex("by_userId", (q: any) =>
          q.eq("userId", identity.tokenIdentifier)
        )
        .collect();
      if (existingProjects.length >= 10) {
        throw new Error("FREE_TIER_LIMIT_REACHED");
      }
    }

    const now = Date.now();
    return await ctx.db.insert("projects", {
      userId: identity.tokenIdentifier,
      title: args.title,
      diagramData: args.diagramData,
      thumbnailId: args.thumbnailId,
      createdAt: now,
      updatedAt: now,
      version: 1,
    });
  },
});

/**
 * Update an existing project (title, diagram data, thumbnail).
 * Validates ownership, increments version, and creates a version snapshot.
 */
export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.optional(v.string()),
    diagramData: v.optional(v.string()),
    thumbnailId: v.optional(v.id("_storage")),
    saveSource: v.optional(v.string()), // "manual" | "auto" — for version history
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    const newVersion = project.version + 1;
    const updates: Record<string, any> = {
      updatedAt: Date.now(),
      version: newVersion,
    };

    if (args.title !== undefined) updates.title = args.title;
    if (args.diagramData !== undefined) updates.diagramData = args.diagramData;
    if (args.thumbnailId !== undefined) updates.thumbnailId = args.thumbnailId;

    // Create a version snapshot of the PREVIOUS state before overwriting
    if (args.diagramData !== undefined) {
      await ctx.db.insert("projectVersions", {
        projectId: args.projectId,
        versionNumber: project.version,
        diagramData: project.diagramData,
        title: project.title,
        source: args.saveSource ?? "auto",
        createdAt: Date.now(),
      });

      // Enforce version limit (20 max)
      const allVersions = await ctx.db
        .query("projectVersions")
        .withIndex("by_projectId_createdAt", (q: any) =>
          q.eq("projectId", args.projectId)
        )
        .order("desc")
        .collect();

      if (allVersions.length > 20) {
        const toDelete = allVersions.slice(20);
        for (const ver of toDelete) {
          await ctx.db.delete(ver._id);
        }
      }
    }

    await ctx.db.patch(args.projectId, updates);
  },
});

/**
 * Delete a project and its thumbnail file.
 * Validates ownership.
 */
export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    // Delete thumbnail file if it exists
    if (project.thumbnailId) {
      await ctx.storage.delete(project.thumbnailId);
    }

    await ctx.db.delete(args.projectId);
  },
});

/**
 * Get a single project by ID with thumbnail URL.
 * Validates ownership.
 */
export const getProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const project = await ctx.db.get(args.projectId);
    if (!project) return null;
    if (project.userId !== identity.tokenIdentifier) return null;

    let thumbnailUrl: string | null = null;
    if (project.thumbnailId) {
      thumbnailUrl = await ctx.storage.getUrl(project.thumbnailId);
    }

    return { ...project, thumbnailUrl };
  },
});

/**
 * Get paginated list of user's projects sorted by most recently modified.
 * Resolves thumbnail URLs for each project.
 */
export const getProjects = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const results = await ctx.db
      .query("projects")
      .withIndex("by_userId_updatedAt", (q: any) =>
        q.eq("userId", identity.tokenIdentifier)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    // Resolve thumbnail URLs
    const pageWithThumbnails = await Promise.all(
      results.page.map(async (project: any) => {
        let thumbnailUrl: string | null = null;
        if (project.thumbnailId) {
          thumbnailUrl = await ctx.storage.getUrl(project.thumbnailId);
        }
        return { ...project, thumbnailUrl };
      })
    );

    return {
      ...results,
      page: pageWithThumbnails,
    };
  },
});
