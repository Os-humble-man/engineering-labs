import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context.js";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */

const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

export const router = t.router;

/**
 * Unprotected prodedure
 */
export const publicProcedure = t.procedure;

/**
 * Protected prodedure
 */

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
