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

  projectVersions: defineTable({
    projectId: v.id("projects"),
    versionNumber: v.number(),
    diagramData: v.string(),
    title: v.string(),
    source: v.string(), // "manual" | "auto"
    createdAt: v.number(),
  })
    .index("by_projectId", ["projectId"])
    .index("by_projectId_createdAt", ["projectId", "createdAt"]),

  waitlist: defineTable({
    email: v.string(),
    signupDate: v.number(),
    referralSource: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_signupDate", ["signupDate"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    subscriptionTier: v.string(),
    aiGenerationsUsed: v.number(),
    aiGenerationsLimit: v.number(),
    exportCount: v.number(),
    // Lemon Squeezy subscription fields
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonSqueezySubscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_lemonSqueezyCustomerId", ["lemonSqueezyCustomerId"]),
});
