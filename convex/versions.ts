import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const MAX_VERSIONS_PER_PROJECT = 20;

/**
 * Create a version snapshot for a project.
 * Called automatically when a project is saved.
 * Enforces MAX_VERSIONS_PER_PROJECT limit by deleting oldest.
 */
export const createVersion = mutation({
  args: {
    projectId: v.id("projects"),
    diagramData: v.string(),
    title: v.string(),
    versionNumber: v.number(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    // Insert the new version
    await ctx.db.insert("projectVersions", {
      projectId: args.projectId,
      versionNumber: args.versionNumber,
      diagramData: args.diagramData,
      title: args.title,
      source: args.source,
      createdAt: Date.now(),
    });

    // Enforce version limit — delete oldest versions beyond the cap
    const allVersions = await ctx.db
      .query("projectVersions")
      .withIndex("by_projectId_createdAt", (q: any) =>
        q.eq("projectId", args.projectId)
      )
      .order("desc")
      .collect();

    if (allVersions.length > MAX_VERSIONS_PER_PROJECT) {
      const toDelete = allVersions.slice(MAX_VERSIONS_PER_PROJECT);
      for (const version of toDelete) {
        await ctx.db.delete(version._id);
      }
    }
  },
});

/**
 * Get all versions for a project, newest first.
 */
export const getVersions = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== identity.tokenIdentifier) return [];

    const versions = await ctx.db
      .query("projectVersions")
      .withIndex("by_projectId_createdAt", (q: any) =>
        q.eq("projectId", args.projectId)
      )
      .order("desc")
      .collect();

    // Return without diagramData to keep the list lightweight
    return versions.map((v) => ({
      _id: v._id,
      versionNumber: v.versionNumber,
      title: v.title,
      source: v.source,
      createdAt: v.createdAt,
    }));
  },
});

/**
 * Get a single version's full data (including diagramData) for restore/preview.
 */
export const getVersion = query({
  args: {
    versionId: v.id("projectVersions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const version = await ctx.db.get(args.versionId);
    if (!version) return null;

    // Verify project ownership
    const project = await ctx.db.get(version.projectId);
    if (!project || project.userId !== identity.tokenIdentifier) return null;

    return version;
  },
});

/**
 * Restore a version — copies the version's diagramData back to the project.
 * Also creates a new version snapshot of the current state before restoring.
 */
export const restoreVersion = mutation({
  args: {
    versionId: v.id("projectVersions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const version = await ctx.db.get(args.versionId);
    if (!version) throw new Error("Version not found");

    const project = await ctx.db.get(version.projectId);
    if (!project || project.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    // Save current state as a version before restoring (so user can undo the restore)
    await ctx.db.insert("projectVersions", {
      projectId: version.projectId,
      versionNumber: project.version,
      diagramData: project.diagramData,
      title: project.title,
      source: "auto",
      createdAt: Date.now(),
    });

    // Restore the selected version's data to the project
    const newVersion = project.version + 1;
    await ctx.db.patch(version.projectId, {
      diagramData: version.diagramData,
      version: newVersion,
      updatedAt: Date.now(),
    });

    return { projectId: version.projectId, newVersion };
  },
});
