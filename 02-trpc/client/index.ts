import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server/appRouter.js";

const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:7222",headers:{
    authorization:"Bearer test-token"
  } })],
});

const users = await trpc.userList.query();



// await trpc.userRemove.query('2')
// await trpc.userRemove.query('4')

console.log(await trpc.userGreeting.morning.query())
console.log(await trpc.userGreeting.evening.query())



console.log(users);
