import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server/appRouter.js";

const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:7222",headers:{
    authorization:"Bearer test-token"
  } })],
});

const users = await trpc.user.list.query();



// await trpc.userRemove.query('2')
// await trpc.user.remove.mutate('15');

// console.log(await trpc.user.greeting.morning.query())
// console.log(await trpc.user.greeting.evening.query())



console.log(users);
