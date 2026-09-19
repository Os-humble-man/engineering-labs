import { z } from "zod";
import { protectedProcedure } from "../middleware/authmiddleware.js";
import { publicProcedure } from "../trcp.js";

type User = {
  id: string;
  name: string;
};

export const userRoutes = (users: User[]) => {
  return {
    userCreate: publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async (opts) => {
        const { input } = opts;
        let generatedId = users.length + 1;

        const user: User = { id: generatedId.toString(), name: input.name };

        users.push(user);

        return user;
      }),
    userList: protectedProcedure.query(async ({ ctx }) => {
      console.log("Context", ctx);
      return users;
    }),
    userById: publicProcedure.input(z.string()).query(async (opts) => {
      const { input } = opts;
      return users.find((user) => user.id === input);
    }),

    userRemove: publicProcedure.input(z.string()).query(async (opts) => {
      const { input } = opts;
      return (users = users.filter((user) => user.id !== input));
    }),

    userGreeting: {
      morning: publicProcedure.query(async () => "Good morning"),
      evening: publicProcedure.query(() => "Good evening"),
    },
  };
};
