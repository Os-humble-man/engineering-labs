import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export async function createContext(opts: CreateHTTPContextOptions) {
  const token = opts.req.headers["authorization"];
  const user = token ? { email: "oscar@trpc.com" } : null;
  return {
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
