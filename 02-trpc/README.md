# 02 — tRPC Lab

A small hands-on lab created to understand how tRPC provides end-to-end type safety between a Node.js server and a TypeScript client.

The goal is not to build a production application. The project deliberately uses an in-memory user list and a standalone HTTP server so that the focus stays on tRPC itself.

This lab currently explores:

- routers and procedures
- queries and mutations
- runtime input validation with Zod
- server-to-client type inference
- request context
- reusable protected procedures
- simulated authentication through an HTTP header

---

## Goal

The main objective is to understand how a TypeScript client can call server procedures with fully inferred inputs and outputs, without a `.proto` file, OpenAPI document, or generated client.

The central mechanism is:

```text
Server implementation
        │
        ▼
typeof appRouter
        │
        ▼
AppRouter type
        │
        ▼
Typed tRPC client
```

The server exports only the router type:

```ts
export type AppRouter = typeof appRouter;
```

The client consumes that type:

```ts
createTRPCClient<AppRouter>({ ... });
```

No server code is bundled into the client: `AppRouter` is a TypeScript type and disappears after compilation.

---

## Architecture

```text
TypeScript client
       │
       │ HTTP requests through httpBatchLink
       ▼
tRPC standalone server
       │
       ├── createContext()
       ├── publicProcedure
       ├── protectedProcedure
       └── user procedures
              │
              ▼
       In-memory user list
```

---

## Project Structure

```text
02-trpc/
│
├── client/
│   └── index.ts
│
├── server/
│   ├── middleware/
│   │   └── authmiddleware.ts
│   ├── routers/
│   │   └── user.ts
│   ├── appRouter.ts
│   ├── context.ts
│   ├── index.ts
│   └── trcp.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

`server/trcp.ts` initializes tRPC and exports its reusable helpers. `server/middleware/authmiddleware.ts` defines the authentication middleware and builds `protectedProcedure` from `publicProcedure`.

---

## Procedures Currently Implemented

| Procedure | Type | Access | Purpose |
|---|---|---|---|
| `userCreate` | Mutation | Public | Add a user to the in-memory list |
| `userList` | Query | Protected | Return all users |
| `userById` | Query | Public | Find a user by ID |
| `userRemove` | Query for now | Public | Remove a user; this must become a mutation |
| `userGreeting.morning` | Query | Public | Return a morning greeting |
| `userGreeting.evening` | Query | Public | Return an evening greeting |

This API is intentionally small. It exists to make the differences between queries, mutations, nested routers, validation, and protected procedures visible.

---

## Query and Mutation

A query reads data and should not intentionally change server state:

```ts
userById: publicProcedure
  .input(z.string())
  .query(({ input }) => {
    return users.find((user) => user.id === input);
  });
```

A mutation performs a state-changing operation:

```ts
userCreate: publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation(({ input }) => {
    // Create and return a user
  });
```

`userRemove` still uses `.query()` in the current experiment. Converting it to `.mutation()` is one of the remaining learning steps.

---

## Zod Input Validation

tRPC uses Zod schemas to validate untrusted input at runtime while also inferring its TypeScript type.

```ts
z.object({
  name: z.string(),
});
```

This provides two complementary guarantees:

```text
Zod schema
   ├── runtime validation
   └── TypeScript inference
```

TypeScript protects callers during development, while Zod protects the running server from invalid network input.

---

## Context and Simulated Authentication

`createContext()` runs for each HTTP request. In this lab, any `Authorization` header simulates an authenticated user:

```text
Authorization header present
        ↓
ctx.user exists
        ↓
protectedProcedure allowed
```

Without the header:

```text
No Authorization header
        ↓
ctx.user = null
        ↓
UNAUTHORIZED
```

The client currently sends:

```ts
headers: {
  authorization: "Bearer test-token",
}
```

This is intentionally not real authentication. The lab does not validate a JWT, load a database user, or implement sessions. Its only purpose is to demonstrate how request data flows through `createContext()` into a reusable middleware.

---

## Public and Protected Procedures

`publicProcedure` can be called without an authenticated user.

`authMiddleware` checks `ctx.user` and throws a tRPC error when it is absent:

```ts
if (!ctx.user) {
  throw new TRPCError({
    code: "UNAUTHORIZED",
  });
}
```

The protected base procedure is composed once and can then be reused by routers:

```ts
export const protectedProcedure = publicProcedure.use(authMiddleware);
```

After that check, protected resolvers can use `ctx.user` as an authenticated user.

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

The server listens on:

```text
http://localhost:7222
```

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

The important comparison is:

```text
gRPC                         tRPC

.proto                       server router
   ↓                              ↓
code generation              typeof appRouter
   ↓                              ↓
typed client                 typed client
```

Both approaches provide strong contracts, but they obtain them in fundamentally different ways.

---

## What I Have Learned So Far

- A router groups callable procedures.
- Queries represent reads, while mutations represent state changes.
- Zod validates network input at runtime and infers TypeScript types.
- `typeof appRouter` exposes the complete API type to the client.
- Context carries request-scoped information into procedures.
- Middleware can turn a base procedure into a reusable protected procedure.
- tRPC type safety does not replace runtime validation or authentication.

---

## Remaining Learning Steps

- [x] Initialize tRPC once on the server
- [x] Create public queries and a mutation
- [x] Validate inputs with Zod
- [x] Export and consume `AppRouter`
- [x] Create request context
- [x] Create a protected procedure
- [x] Simulate authentication with an HTTP header
- [ ] Convert `userRemove` from a query to a mutation
- [ ] Throw `TRPCError({ code: "NOT_FOUND" })` when a user does not exist
- [ ] Add a protected `me` procedure
- [ ] Group the API consistently under a `user` router
- [ ] Add deliberate invalid-input and type-error experiments
- [ ] Clean up names and unused code

---

## What This Lab Does Not Cover

The following topics are intentionally left for later experiments:

- React
- Next.js
- TanStack Query
- database persistence
- Prisma
- complete JWT authentication
- sessions
- WebSockets
- advanced subscriptions
- server-side rendering
- production deployment

Keeping these concerns out of the lab makes the core tRPC mechanism easier to understand.

---

## Status

**In Progress**

The core end-to-end typing, validation, context, and protected-procedure concepts are implemented. Error handling, procedure semantics, API organization, and final cleanup still need to be completed.
