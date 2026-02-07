import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    userId: v.string(),
    title: v.string(),
    diagramData: v.string(),
    thumbnailId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
    version: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_updatedAt", ["userId", "updatedAt"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    subscriptionTier: v.string(),
    aiGenerationsUsed: v.number(),
    aiGenerationsLimit: v.number(),
    exportCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
