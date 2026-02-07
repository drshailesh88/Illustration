import { mutation } from "./_generated/server";

/**
 * Generate a temporary upload URL for file storage (e.g., thumbnails).
 * URL is valid for 1 hour.
 */
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});
