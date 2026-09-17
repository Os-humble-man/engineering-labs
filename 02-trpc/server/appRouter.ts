import { input, string, z } from "zod";
import { publicProcedure, router } from "./trcp.js";

let users: User[] = [
  { id: "1", name: "Oscar" },
  { id: "2", name: "Bernard" },
  { id: "3", name: "Junior" },
  { id: "4", name: "Gael" },
  { id: "5", name: "Emma" },
];

type User = {
  id: string;
  name: string;
};

export const appRouter = router({
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      let generatedId = users.length + 1;

      const user: User = { id: generatedId.toString(), name: input.name };

      users.push(user);

      return user;
    }),
  userList: publicProcedure.query(async () => {
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return users.find((user) => user.id === input);
  }),

  userRemove: publicProcedure
    .input(z.string()).query(async (opts)=>{
      const {input} = opts;
       return (users = users.filter((user) => user.id === input));
    })
});

export type AppRouter = typeof appRouter;
