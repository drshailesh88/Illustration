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
  storage: {
    generateUploadUrl: FunctionReference<"mutation", "public", Record<string, never>, any>;
  };
  waitlist: {
    joinWaitlist: FunctionReference<"mutation", "public", any, any>;
    getWaitlistCount: FunctionReference<"query", "public", Record<string, never>, any>;
  };
};

export { api };
