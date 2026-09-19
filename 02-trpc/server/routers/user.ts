import { z } from "zod";
import { protectedProcedure } from "../middleware/authmiddleware.js";
import { publicProcedure } from "../trpc.js";
import { TRPCError } from "@trpc/server";

type User = {
  id: string;
  name: string;
};

export const userRoutes = (users: User[]) => {
  return {
    create: protectedProcedure
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
    byId: protectedProcedure.input(z.string()).query(async (opts) => {
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

    update: protectedProcedure
      .input(z.object({ id: z.string(), name: z.string() }))
      .mutation(async ({ input }) => {
        const user = users.find((user) => user.id === input.id);
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        user.name = input.name;
        return {
          success: true,
        };
      }),

    remove: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
      const index = users.findIndex((user) => user.id === input);

      if (index === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User not found with ID: ${input}`,
        });
      }
      users.splice(index, 1);

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
