import { z } from "zod";
import { protectedProcedure } from "../middleware/authmiddleware.js";
import { publicProcedure } from "../trcp.js";
import { TRPCError } from "@trpc/server";

type User = {
  id: string;
  name: string;
};

export const userRoutes = (users: User[]) => {
  return {
    create: publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async (opts) => {
        const { input } = opts;
        const user: User = { id: crypto.randomUUID(), name: input.name };

        users.push(user);

        return user;
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      console.log("Context", ctx);
      return users;
    }),
    byId: publicProcedure.input(z.string()).query(async (opts) => {
      const { input } = opts;
      const user = users.find((user) => user.id === input);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return user;
    }),

    remove: publicProcedure.input(z.string()).mutation(async ({ input }) => {
      const exists = users.some((user) => user.id === input);

      if (!exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found with ID" + input
        });
      }
      users = users.filter((user) => user.id !== input);

      return {
        success: true,
      };
    }),

    greeting: {
      morning: publicProcedure.query(async () => "Good morning"),
      evening: publicProcedure.query(() => "Good evening"),
    },

    me: protectedProcedure.query(({ ctx }) => {
      return ctx.user;
    }),
  };
};
