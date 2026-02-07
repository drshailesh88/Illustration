/**
 * Auto-generated Convex API type stubs.
 * These are replaced by `npx convex dev` when connected to a Convex deployment.
 * DO NOT EDIT — this file is overwritten by the Convex CLI.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionReference } from "convex/server";

declare const api: {
  users: {
    getOrCreateUser: FunctionReference<"mutation", "public", Record<string, never>, any>;
    getUser: FunctionReference<"query", "public", Record<string, never>, any>;
    updateUser: FunctionReference<"mutation", "public", any, any>;
  };
  projects: {
    saveProject: FunctionReference<"mutation", "public", any, any>;
    updateProject: FunctionReference<"mutation", "public", any, any>;
    deleteProject: FunctionReference<"mutation", "public", any, any>;
    getProject: FunctionReference<"query", "public", any, any>;
    getProjects: FunctionReference<"query", "public", any, any>;
  };
  versions: {
    createVersion: FunctionReference<"mutation", "public", any, any>;
    getVersions: FunctionReference<"query", "public", any, any>;
    getVersion: FunctionReference<"query", "public", any, any>;
    restoreVersion: FunctionReference<"mutation", "public", any, any>;
  };
  storage: {
    generateUploadUrl: FunctionReference<"mutation", "public", Record<string, never>, any>;
  };
  customAssets: {
    saveAsset: FunctionReference<"mutation", "public", any, any>;
    listAssets: FunctionReference<"query", "public", Record<string, never>, any>;
    deleteAsset: FunctionReference<"mutation", "public", any, any>;
  };
  waitlist: {
    joinWaitlist: FunctionReference<"mutation", "public", any, any>;
    getWaitlistCount: FunctionReference<"query", "public", Record<string, never>, any>;
  };
  lemonSqueezy: {
    handleWebhookEvent: FunctionReference<"mutation", "public", any, any>;
    getSubscriptionStatus: FunctionReference<"query", "public", Record<string, never>, any>;
  };
};

export { api };
