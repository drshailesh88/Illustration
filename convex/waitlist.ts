import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Join the waitlist — public mutation (no auth required).
 * Normalizes email, checks for duplicates, inserts if new.
 */
export const joinWaitlist = mutation({
  args: {
    email: v.string(),
    referralSource: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    // Validate email format
    const atIndex = email.indexOf("@");
    const dotAfterAt = email.indexOf(".", atIndex);
    if (atIndex < 1 || dotAfterAt < atIndex + 2 || dotAfterAt >= email.length - 1) {
      throw new Error("Please enter a valid email address");
    }

    // Check for duplicate
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return {
        status: "already_exists" as const,
        message: "You're already on the waitlist!",
      };
    }

    // Insert new signup
    await ctx.db.insert("waitlist", {
      email,
      signupDate: Date.now(),
      referralSource: args.referralSource ?? "",
    });

    return {
      status: "success" as const,
      message: "You're on the list!",
    };
  },
});

/**
 * Get total waitlist signup count — public query (no auth required).
 */
export const getWaitlistCount = query({
  args: {},
  handler: async (ctx) => {
    const signups = await ctx.db.query("waitlist").collect();
    return signups.length;
  },
});
