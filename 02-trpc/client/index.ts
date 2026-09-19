import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/appRouter.js";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:7222",
      headers: {
        authorization: "Bearer test-token",
      },
    }),
  ],
});

const users = await trpc.user.list.query();

// await trpc.user.create.mutate({ name: "Alice" });
// await trpc.user.byId.query("2");
// await trpc.user.update.mutate({ id: "2", name: "Jules" });
// await trpc.user.remove.mutate("2");

// console.log(await trpc.user.greeting.morning.query());
// console.log(await trpc.user.greeting.evening.query());
// console.log(await trpc.user.me.query());

console.log(users);
