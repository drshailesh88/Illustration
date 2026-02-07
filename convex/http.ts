import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

/**
 * Lemon Squeezy Webhook Endpoint
 *
 * Receives subscription events from Lemon Squeezy and updates user records.
 * Verifies the webhook signature using HMAC-SHA256 before processing.
 *
 * Required env var: LEMON_SQUEEZY_WEBHOOK_SECRET
 */
http.route({
  path: "/lemon-squeezy-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Verify webhook signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("LEMON_SQUEEZY_WEBHOOK_SECRET not configured");
      return new Response("Server configuration error", { status: 500 });
    }

    const signature = request.headers.get("X-Signature");
    if (!signature) {
      return new Response("Missing signature", { status: 401 });
    }

    const rawBody = await request.text();

    // Verify HMAC-SHA256 signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(rawBody)
    );
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (computedSignature !== signature) {
      console.warn("Webhook signature verification failed");
      return new Response("Invalid signature", { status: 401 });
    }

    // Parse the event
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const eventName = payload.meta?.event_name;
    if (!eventName) {
      return new Response("Missing event name", { status: 400 });
    }

    // Only handle subscription events
    const supportedEvents = [
      "subscription_created",
      "subscription_updated",
      "subscription_cancelled",
      "subscription_expired",
    ];

    if (!supportedEvents.includes(eventName)) {
      // Acknowledge non-subscription events without processing
      return new Response("OK", { status: 200 });
    }

    // Extract data from the Lemon Squeezy payload
    const attrs = payload.data?.attributes;
    if (!attrs) {
      return new Response("Missing attributes", { status: 400 });
    }

    const customerId = String(attrs.customer_id ?? "");
    const subscriptionId = String(payload.data?.id ?? "");
    const productName = attrs.product_name ?? attrs.variant_name ?? "";
    const status = attrs.status ?? "";
    const userEmail = attrs.user_email ?? "";
    const currentPeriodEnd = attrs.renews_at
      ? new Date(attrs.renews_at).getTime()
      : undefined;

    // Extract Clerk user ID from custom data (passed during checkout)
    const clerkUserId =
      payload.meta?.custom_data?.clerk_user_id ??
      attrs.first_order_item?.custom_data?.clerk_user_id ??
      undefined;

    // Call the mutation to update the user record
    const result = await ctx.runMutation(api.lemonSqueezy.handleWebhookEvent, {
      eventName,
      customerId,
      subscriptionId,
      productName,
      status,
      userEmail,
      currentPeriodEnd,
      clerkUserId,
    });

    if (!result.success) {
      console.warn(`Webhook processing failed: ${result.reason}`);
      // Return 200 anyway to prevent Lemon Squeezy retries for user-not-found
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
