import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const MAX_FILE_SIZE_FREE = 5 * 1024 * 1024; // 5 MB
const MAX_TOTAL_FREE = 50 * 1024 * 1024; // 50 MB total
const MAX_TOTAL_PRO = 500 * 1024 * 1024; // 500 MB total

/**
 * Save a custom image/icon asset linked to the authenticated user.
 */
export const saveAsset = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    mimeType: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.tokenIdentifier;

    // Validate file size
    if (args.fileSize > MAX_FILE_SIZE_FREE) {
      throw new Error("File too large (max 5MB)");
    }

    // Check total storage used
    const existing = await ctx.db
      .query("customAssets")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const totalUsed = existing.reduce((sum, a) => sum + a.fileSize, 0);

    // Get user tier
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .first();

    const isPro = user?.subscriptionTier === "pro" || user?.subscriptionTier === "team";
    const maxTotal = isPro ? MAX_TOTAL_PRO : MAX_TOTAL_FREE;

    if (totalUsed + args.fileSize > maxTotal) {
      throw new Error(
        isPro
          ? "Storage limit reached (500MB). Please delete unused assets."
          : "Storage limit reached (50MB). Upgrade to Pro for 500MB."
      );
    }

    return await ctx.db.insert("customAssets", {
      userId,
      storageId: args.storageId,
      name: args.name,
      mimeType: args.mimeType,
      fileSize: args.fileSize,
      createdAt: Date.now(),
    });
  },
});

/**
 * List all custom assets for the authenticated user.
 */
export const listAssets = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.tokenIdentifier;

    const assets = await ctx.db
      .query("customAssets")
      .withIndex("by_userId_createdAt", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // Attach download URLs
    return Promise.all(
      assets.map(async (asset) => ({
        ...asset,
        url: await ctx.storage.getUrl(asset.storageId),
      }))
    );
  },
});

/**
 * Delete a custom asset.
 */
export const deleteAsset = mutation({
  args: {
    assetId: v.id("customAssets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const asset = await ctx.db.get(args.assetId);
    if (!asset) throw new Error("Asset not found");

    if (asset.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    // Delete the file from storage
    await ctx.storage.delete(asset.storageId);
    // Delete the record
    await ctx.db.delete(args.assetId);
  },
});
