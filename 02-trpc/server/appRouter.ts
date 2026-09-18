import { router } from "./trcp.js";
import { userRoutes } from "./routers/user.js";

type User = {
  id: string;
  name: string;
};

let users: User[] = [
  { id: "1", name: "Oscar" },
  { id: "2", name: "Bernard" },
  { id: "3", name: "Junior" },
  { id: "4", name: "Gael" },
  { id: "5", name: "Emma" },
];

export const appRouter = router(userRoutes(users));

export type AppRouter = typeof appRouter;
