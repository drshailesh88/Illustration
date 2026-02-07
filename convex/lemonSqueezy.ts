import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Handle Lemon Squeezy webhook events.
 * Called by the HTTP endpoint when a webhook is received.
 *
 * Supported events:
 * - subscription_created: New subscription activated
 * - subscription_updated: Subscription changed (upgrade/downgrade/renew)
 * - subscription_cancelled: Subscription cancelled (still active until period end)
 * - subscription_expired: Subscription period ended after cancellation
 */
export const handleWebhookEvent = mutation({
  args: {
    eventName: v.string(),
    customerId: v.string(),
    subscriptionId: v.string(),
    productName: v.string(),
    status: v.string(),
    userEmail: v.string(),
    currentPeriodEnd: v.optional(v.number()),
    clerkUserId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Determine the subscription tier from the product name
    const tier = determineTier(args.productName, args.status);

    // Find user by Clerk user ID (from checkout custom data) or by email
    let user = null;

    if (args.clerkUserId) {
      user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
          q.eq("tokenIdentifier", args.clerkUserId)
        )
        .first();
    }

    // Fallback: find by Lemon Squeezy customer ID
    if (!user) {
      user = await ctx.db
        .query("users")
        .withIndex("by_lemonSqueezyCustomerId", (q) =>
          q.eq("lemonSqueezyCustomerId", args.customerId)
        )
        .first();
    }

    if (!user) {
      console.warn(
        `Webhook: No user found for customerId=${args.customerId}, email=${args.userEmail}`
      );
      return { success: false, reason: "user_not_found" };
    }

    // Update user subscription data
    const updates: Record<string, string | number | undefined> = {
      lemonSqueezyCustomerId: args.customerId,
      lemonSqueezySubscriptionId: args.subscriptionId,
      subscriptionStatus: args.status,
      subscriptionTier: tier,
      updatedAt: Date.now(),
    };

    if (args.currentPeriodEnd) {
      updates.currentPeriodEnd = args.currentPeriodEnd;
    }

    // Update generation limits based on tier
    if (tier === "pro" || tier === "team") {
      updates.aiGenerationsLimit = 1000;
    } else {
      updates.aiGenerationsLimit = 10;
    }

    await ctx.db.patch(user._id, updates);

    return { success: true, tier, status: args.status };
  },
});

/**
 * Get subscription status for the current user.
 */
export const getSubscriptionStatus = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();

    if (!user) return null;

    return {
      tier: user.subscriptionTier,
      status: user.subscriptionStatus ?? "none",
      currentPeriodEnd: user.currentPeriodEnd,
      lemonSqueezyCustomerId: user.lemonSqueezyCustomerId,
    };
  },
});

/**
 * Determine the subscription tier from the Lemon Squeezy product name and status.
 */
function determineTier(
  productName: string,
  status: string
): "free" | "pro" | "team" {
  // If subscription is expired or cancelled (past period), revert to free
  if (status === "expired" || status === "unpaid") {
    return "free";
  }

  const name = productName.toLowerCase();

  if (name.includes("team") || name.includes("lab")) {
    return "team";
  }

  if (name.includes("pro")) {
    return "pro";
  }

  return "free";
}
