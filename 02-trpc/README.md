# 02 - tRPC Lab

A small hands-on lab for understanding how tRPC provides end-to-end type safety between a Node.js server and a TypeScript client.

The project deliberately uses an in-memory user list and a standalone HTTP server so the focus stays on tRPC itself.

This lab explores:

- routers and nested procedures
- queries and mutations
- runtime input validation with Zod
- server-to-client type inference
- request context
- reusable protected procedures
- simulated authentication through an HTTP header

---

## Goal

The objective is to understand how a TypeScript client can call server procedures with fully inferred inputs and outputs, without a `.proto` file, an OpenAPI document, or a generated client.

```text
Server implementation
        |
        v
typeof appRouter
        |
        v
AppRouter type
        |
        v
Typed tRPC client
```

The server exports the router type:

```ts
export type AppRouter = typeof appRouter;
```

The client imports it as a type and passes it to `createTRPCClient`:

```ts
import type { AppRouter } from "../server/appRouter.js";

const trpc = createTRPCClient<AppRouter>({ ... });
```

`AppRouter` disappears after TypeScript compilation, so no server implementation is bundled into the client.

---

## Project Structure

```text
02-trpc/
|-- client/
|   `-- index.ts
|-- server/
|   |-- middleware/
|   |   `-- authmiddleware.ts
|   |-- routers/
|   |   `-- user.ts
|   |-- appRouter.ts
|   |-- context.ts
|   |-- index.ts
|   `-- trpc.ts
|-- package.json
|-- tsconfig.json
`-- README.md
```

- `server/trpc.ts` initializes tRPC and exports `router`, `middleware`, and `publicProcedure`.
- `server/context.ts` creates the request context.
- `server/middleware/authmiddleware.ts` defines `authMiddleware` and `protectedProcedure`.
- `server/routers/user.ts` defines the procedures grouped under `user`.
- `server/appRouter.ts` creates the root router and exports `AppRouter`.
- `client/index.ts` creates the typed client and calls the API.

---

## Procedures Currently Implemented

All user operations are grouped under the `user` router.

| Procedure | Type | Access | Purpose |
|---|---|---|---|
| `user.create` | Mutation | Protected | Create and return a user |
| `user.list` | Query | Protected | Return all users |
| `user.byId` | Query | Protected | Find a user by ID |
| `user.update` | Mutation | Protected | Update a user's name |
| `user.remove` | Mutation | Protected | Remove a user by ID |
| `user.me` | Query | Protected | Return the authenticated context user |
| `user.greeting.morning` | Query | Public | Return a morning greeting |
| `user.greeting.evening` | Query | Public | Return an evening greeting |

---

## Queries and Mutations

Queries read data:

```ts
const users = await trpc.user.list.query();
const user = await trpc.user.byId.query("2");
```

Mutations change server state:

```ts
const createdUser = await trpc.user.create.mutate({ name: "Alice" });

await trpc.user.update.mutate({
  id: "2",
  name: "Jules",
});

await trpc.user.remove.mutate("2");
```

The list is stored in memory. Any changes are lost when the server stops.

---

## Zod Input Validation

tRPC uses Zod schemas to validate network input at runtime while inferring the corresponding TypeScript input types.

```ts
z.object({
  id: z.string(),
  name: z.string(),
});
```

TypeScript catches invalid calls during development, while Zod rejects invalid input received by the running server.

---

## Context and Simulated Authentication

`createContext()` runs for every HTTP request. In this lab, the presence of an `Authorization` header simulates an authenticated user:

```text
Authorization header present -> ctx.user exists -> protected procedure allowed
No Authorization header      -> ctx.user is null -> protected procedure denied
```

The client currently sends:

```ts
headers: {
  authorization: "Bearer test-token",
}
```

This is not real authentication: the token is not validated. The example only demonstrates how request data flows through `createContext()` and a reusable middleware.

The protected base procedure is composed once:

```ts
export const protectedProcedure = publicProcedure.use(authMiddleware);
```

Only the two greeting procedures remain public.

---

## Running the Lab

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run server
```

The server listens on `http://localhost:7222`.

In another terminal, run the client:

```bash
npm run client
```

Check the TypeScript project without emitting JavaScript:

```bash
npx tsc --noEmit
```

---

## tRPC vs gRPC

| gRPC | tRPC |
|---|---|
| Contract defined in a `.proto` file | Contract inferred from the TypeScript router |
| Type generation step | No code generation step |
| Works across many programming languages | Designed primarily for TypeScript-to-TypeScript applications |
| Protobuf serialization | Commonly transported over HTTP with JSON-like data |
| Generated service client | Client typed with `AppRouter` |
| Native streaming support | Query/mutation model; subscriptions require additional setup |

---

## Learning Progress

- [x] Initialize tRPC once in `server/trpc.ts`
- [x] Create public and protected procedures
- [x] Validate inputs with Zod
- [x] Export and consume `AppRouter`
- [x] Create request context and authentication middleware
- [x] Simulate authentication with an HTTP header
- [x] Group the API under the `user` router
- [x] Implement create, list, lookup, update, and removal operations
- [x] Use mutations for state-changing operations
- [x] Add the protected `user.me` procedure

---

## Status

The core learning goals are implemented: end-to-end typing, validation, nested routing, context, protected procedures, and mutations. The project remains a learning lab rather than a production-ready application.
