import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get or create a user record from the authenticated Clerk identity.
 * Called on every authenticated page load (lazy creation pattern).
 * Returns the user's Convex document ID.
 */
export const getOrCreateUser = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? "",
      subscriptionTier: "free",
      aiGenerationsUsed: 0,
      aiGenerationsLimit: 10,
      exportCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

/**
 * Get the current authenticated user's record.
 * Returns null if not authenticated or no record exists.
 */
export const getUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    return await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();
  },
});

/**
 * Update specific fields on the current user's record.
 */
export const updateUser = mutation({
  args: {
    subscriptionTier: v.optional(v.string()),
    aiGenerationsUsed: v.optional(v.number()),
    aiGenerationsLimit: v.optional(v.number()),
    exportCount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const updates: Record<string, string | number> = {
      updatedAt: Date.now(),
    };

    if (args.subscriptionTier !== undefined) {
      updates.subscriptionTier = args.subscriptionTier;
    }
    if (args.aiGenerationsUsed !== undefined) {
      updates.aiGenerationsUsed = args.aiGenerationsUsed;
    }
    if (args.aiGenerationsLimit !== undefined) {
      updates.aiGenerationsLimit = args.aiGenerationsLimit;
    }
    if (args.exportCount !== undefined) {
      updates.exportCount = args.exportCount;
    }

    await ctx.db.patch(user._id, updates);
  },
});
