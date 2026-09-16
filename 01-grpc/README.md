# 01 — gRPC Lab

A small hands-on lab created to understand how gRPC works with Node.js and TypeScript.

The goal of this project is not to build a production application, but to explore the core concepts behind gRPC through simple experiments.

This lab covers:

- Protocol Buffers
- gRPC client and server
- Unary RPC
- Server streaming
- Client streaming
- Bidirectional streaming
- gRPC metadata
- Status codes and error handling
- Deadlines
- Cancellation
- TypeScript type generation from `.proto` files

---

## Goal

The main objective of this lab is to understand how two applications communicate using gRPC.

Instead of focusing on business logic, the project intentionally uses simple in-memory data so that the focus remains on:

- service definition
- RPC communication
- streaming
- request lifecycle
- type safety
- failure handling

---

## Architecture

```text
                    user.proto
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
        Type generation      Runtime loading
              │                   │
              ▼                   ▼
      TypeScript types       proto-loader
              │                   │
              └─────────┬─────────┘
                        │
                        ▼

                  gRPC Client
                       │
                       │ HTTP/2 + Protobuf
                       ▼
                  gRPC Server
```

The client and server share the same Protobuf contract.

---

## Project Structure

```text
01-grpc/
│
├── client/
│   └── index.ts
│
├── server/
│   └── index.ts
│
├── proto/
│   └── user.proto
│
├── generated/
│   ├── user.ts
│   ├── users/
│   └── google/
│
├── package.json
├── tsconfig.json
└── README.md
```

The `generated/` directory contains TypeScript definitions generated from the Protobuf contract. These files should not be edited manually.

---

## Protocol Buffers

The API contract is defined inside `proto/user.proto`.

Example:

```proto
syntax = "proto3";

package users;

message User {
  int32 id = 1;
  string name = 2;
}
```

Unlike a TypeScript interface, a Protobuf message is language-independent. The same contract could be used by Node.js, Go, Java, Python, C#, and other languages.

---

## Service Definition

The lab uses a `UserService` containing different types of RPC methods.

```proto
service UserService {
  rpc SayHello(...) returns (...);
  rpc GetUser(...) returns (...);
  rpc ListUsers(...) returns (...);
  rpc StreamUsers(...) returns (stream User);
  rpc ImportUsers(stream User) returns (...);
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
  rpc SlowOperation(...) returns (...);
}
```

Each RPC exists primarily to demonstrate a specific gRPC concept.

---

## RPC Types

| RPC Type | Request | Response | Example in this lab |
|---|---:|---:|---|
| Unary | 1 | 1 | `GetUser` |
| Server Streaming | 1 | N | `StreamUsers` |
| Client Streaming | N | 1 | `ImportUsers` |
| Bidirectional Streaming | N | N | `Chat` |

### Unary RPC

```text
Client                 Server

Request ──────────────→
        ←────────────── Response
```

Example:

```text
GetUser({ id: 2 })
        ↓
{ id: 2, name: "Bob" }
```

The lab contains several unary RPCs: `SayHello`, `GetUser`, `ListUsers`, and `SlowOperation`.

### Server Streaming

```text
Client                     Server

StreamUsers() ────────────→
             ←──────────── User 1
             ←──────────── User 2
             ←──────────── User 3
             ←──────────── END
```

The server sends values with `call.write()` and closes the stream with `call.end()`.

### Client Streaming

```text
Client                     Server

User 1 ──────────────────→
User 2 ──────────────────→
User 3 ──────────────────→
END ─────────────────────→
       ←────────────────── { count: 3 }
```

The client sends values progressively with `write()` and finishes with `end()`.

### Bidirectional Streaming

```text
Client                         Server

Message ─────────────────────→
        ←───────────────────── Response
Message ─────────────────────→
Message ─────────────────────→
        ←───────────────────── Response
```

The lab uses a simple `Chat` RPC:

```proto
rpc Chat(stream ChatMessage)
    returns (stream ChatMessage);
```

The core mental model is:

```text
Unary                1 → 1
Server Streaming     1 → N
Client Streaming     N → 1
Bidirectional        N ↔ N
```

---

## Metadata

Metadata allows additional information to be attached to an RPC call without placing it inside the business message.

```ts
const metadata = new grpc.Metadata();
metadata.set("authorization", "Bearer abc123");
metadata.set("request-id", "req-123");
```

Typical metadata can include authentication tokens, correlation IDs, tracing information, client information, and custom headers.

---

## gRPC Status Codes

gRPC has its own status model, including:

```text
OK
INVALID_ARGUMENT
NOT_FOUND
UNAUTHENTICATED
PERMISSION_DENIED
INTERNAL
UNAVAILABLE
DEADLINE_EXCEEDED
```

This lab uses `grpc.status.NOT_FOUND` when a requested user does not exist.

---

## Deadlines

A client should not necessarily wait forever for an RPC to complete.

The lab contains a deliberately slow operation. The client can define a deadline:

```ts
const deadline = new Date(Date.now() + 2000);
```

If the server takes longer than the allowed time, the client receives `DEADLINE_EXCEEDED`.

---

## Cancellation

A client can explicitly cancel an RPC:

```ts
stream.cancel();
```

The server can detect the cancellation:

```ts
call.on("cancelled", () => {
  // stop processing
});
```

The difference is:

```text
Deadline      → stop if the call takes too long
Cancellation  → stop the call now
```

---

## TypeScript Code Generation

Initially, the client manually declared types such as `User` and `UserServiceClient`. This duplicated information already present in `user.proto`.

The project now generates TypeScript types from the Protobuf contract:

```text
user.proto
    │
    ▼
proto-loader-gen-types
    │
    ▼
generated/
```

Generated types include request types, response types, service clients, service handlers, and streaming signatures.

### Runtime vs Type Generation

```text
                   user.proto
                   /        \
                  /          \
                 ▼            ▼
         proto-loader    type generator
              │               │
              ▼               ▼
            Runtime        TypeScript
```

`proto-loader` loads and executes the Protobuf service at runtime, while generated definitions give TypeScript compile-time knowledge of the contract.

---

## Running the Lab

Install dependencies:

```bash
pnpm install
```

Generate TypeScript definitions:

```bash
pnpm proto:generate
```

Start the server:

```bash
pnpm server
```

Then, in another terminal:

```bash
pnpm client
```

---

## What I Learned

This lab helped me understand that gRPC is more than simply calling functions over the network.

Key takeaways:

- A `.proto` file acts as a shared, language-independent contract.
- RPC communication is not limited to one request and one response.
- Streaming allows data to be processed progressively.
- RPC calls can carry metadata, deadlines, and cancellation state.
- gRPC uses structured status codes for errors.
- Protobuf can be used as the source of truth for generated TypeScript types.
- Dynamic runtime loading and static type generation solve different problems.

---

## REST vs gRPC

| REST | gRPC |
|---|---|
| Resource-oriented | Service / method-oriented |
| Usually JSON | Usually Protocol Buffers |
| Human-readable payload | Binary serialization |
| HTTP semantics | RPC semantics |
| Usually request/response | Native streaming support |
| OpenAPI commonly used for contracts | `.proto` files |
| Very browser-friendly | Frequently used service-to-service |

Neither approach is universally better. They solve overlapping but different problems.

---

## When gRPC Can Be Useful

Examples include:

- microservice communication
- internal service-to-service APIs
- high-volume RPC communication
- streaming data
- polyglot systems
- strongly defined contracts

Example:

```text
Node.js service
       │
       │ gRPC
       ▼
Go service
       │
       │ gRPC
       ▼
Python service
```

All services can share the same Protobuf contract.

---

## What This Lab Does Not Cover

This project intentionally avoids production-level complexity such as:

- TLS configuration
- production authentication
- load balancing
- service discovery
- retries
- interceptors
- Kubernetes
- service mesh
- distributed tracing
- production observability

These topics can be explored separately in future engineering labs.

---

## Key Takeaway

```text
                .proto
                  │
                  ▼
             RPC Contract
                  │
          ┌───────┴───────┐
          ▼               ▼
       Client           Server
          │               │
          └───── gRPC ─────┘
```

Combined with the four communication patterns:

```text
Unary              1 → 1
Server Streaming   1 → N
Client Streaming   N → 1
Bidirectional      N ↔ N
```

The `.proto` file defines the communication contract, while gRPC handles how those messages and streams travel between applications.

---

## Status

**Completed**

Concepts implemented:

- [x] Protocol Buffers
- [x] Unary RPC
- [x] gRPC status codes
- [x] Server streaming
- [x] Client streaming
- [x] Bidirectional streaming
- [x] Metadata
- [x] Deadlines
- [x] Cancellation
- [x] TypeScript code generation
