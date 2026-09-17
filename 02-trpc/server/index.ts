import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./appRouter.js";

const server = createHTTPServer({
  router: appRouter,
});

const PORT = 7222;

server.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}`,);
});
