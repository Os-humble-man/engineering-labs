import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server/appRouter.js";

const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:7222" })],
});

const users = await trpc.userList.query();

await trpc.userCreate.mutate({name:"Test 1"})
await trpc.userCreate.mutate({name:"Test 2"})

// const user1 = await trpc.userById.query('2')

await trpc.userRemove.query('2')
await trpc.userRemove.query('3')
await trpc.userRemove.query('4')




console.log(users);
