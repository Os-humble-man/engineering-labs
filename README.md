# Engineering Labs

A collection of small, focused experiments built to explore software engineering concepts, backend architecture patterns, distributed systems, and modern infrastructure tools.

The purpose of this repository is not to build production-ready applications, but to understand **how technologies and architectural concepts work through simple hands-on projects**.

Each lab focuses on one main concept and keeps the implementation intentionally small.

---

## Why This Repository?

As software systems grow, understanding frameworks is not enough.

Concepts such as:

- gRPC
- Message queues
- Microservices
- Event-driven architecture
- Distributed systems
- Caching
- Observability
- Resilience patterns
- Container orchestration

become increasingly important.

Instead of building large applications for every technology, this repository uses **small engineering labs** to isolate and experiment with individual concepts.

The main idea is:

> Learn one concept at a time. Build the smallest possible implementation. Understand how and why it works.

---

## Repository Structure

```text
engineering-labs/
│
├── README.md
│
├── 01-grpc/
│   └── README.md
│
├── 02-websocket/
│   └── README.md
│
├── 03-redis-cache/
│   └── README.md
│
├── 04-rabbitmq/
│   └── README.md
│
├── 05-event-driven/
│   └── README.md
│
├── 06-microservices/
│   └── README.md
│
├── 07-api-gateway/
│   └── README.md
│
├── 08-resilience/
│   └── README.md
│
├── 09-cqrs/
│   └── README.md
│
├── 10-event-sourcing/
│   └── README.md
│
├── 11-opentelemetry/
│   └── README.md
│
└── 12-kubernetes/
    └── README.md
```

The structure may evolve as new concepts are explored.

---

## Labs

| # | Lab | Main Concepts | Status |
|---|---|---|---|
| 01 | [gRPC](./01-grpc) | Protocol Buffers, RPC, HTTP/2, Streaming | Planned |
| 02 | [WebSocket](./02-websocket) | Real-time communication, persistent connections | Planned |
| 03 | [Redis Cache](./03-redis-cache) | Caching, TTL, cache invalidation | Planned |
| 04 | [RabbitMQ](./04-rabbitmq) | Queues, producers, consumers, workers | Planned |
| 05 | [Event-Driven Architecture](./05-event-driven) | Events, publishers, subscribers | Planned |
| 06 | [Microservices](./06-microservices) | Service boundaries, inter-service communication | Planned |
| 07 | [API Gateway](./07-api-gateway) | Routing, aggregation, centralized entry point | Planned |
| 08 | [Resilience](./08-resilience) | Retry, timeout, circuit breaker, fallback | Planned |
| 09 | [CQRS](./09-cqrs) | Commands, queries, separation of responsibilities | Planned |
| 10 | [Event Sourcing](./10-event-sourcing) | Event store, state reconstruction | Planned |
| 11 | [OpenTelemetry](./11-opentelemetry) | Traces, metrics, distributed observability | Planned |
| 12 | [Kubernetes](./12-kubernetes) | Pods, deployments, services, orchestration | Planned |

### Status

- `Planned` — Not started yet
- `In Progress` — Currently exploring
- `Completed` — Main learning objectives completed

---

## Learning Roadmap

The labs roughly follow this progression:

```text
Communication
     │
     ├── HTTP
     ├── WebSocket
     └── gRPC
          │
          ▼
Asynchronous Communication
     │
     ├── Message Queues
     └── Pub/Sub
          │
          ▼
Distributed Architecture
     │
     ├── Microservices
     ├── API Gateway
     └── Event-Driven Architecture
          │
          ▼
Resilience
     │
     ├── Timeout
     ├── Retry
     └── Circuit Breaker
          │
          ▼
Distributed Systems
     │
     ├── Idempotency
     ├── Concurrency
     ├── Distributed Locks
     └── Transactions
          │
          ▼
Architecture Patterns
     │
     ├── CQRS
     └── Event Sourcing
          │
          ▼
Observability
     │
     ├── Logging
     ├── Metrics
     └── Distributed Tracing
          │
          ▼
Infrastructure
     │
     ├── Docker
     └── Kubernetes
```

---

## Technologies

Different labs may use different technologies depending on the concept being explored.

Some of the technologies used or planned include:

### Languages

- TypeScript
- JavaScript

### Backend

- Node.js
- NestJS
- Express

### Frontend

- React
- Vite

### Communication

- REST
- gRPC
- Protocol Buffers
- WebSocket

### Databases

- PostgreSQL
- MySQL
- Redis

### Messaging

- RabbitMQ

### Infrastructure

- Docker
- Docker Compose
- Kubernetes
- Nginx

### Observability

- OpenTelemetry
- Prometheus
- Grafana

---

## Lab Philosophy

Each lab follows a few simple principles.

### Small Scope

The goal is not to create a complete application.

A lab should contain only what is necessary to demonstrate the concept.

For example:

```text
grpc-lab/

client/
server/
proto/
README.md
```

That may be enough to understand:

- service definitions
- Protocol Buffers
- RPC calls
- serialization
- streaming

---

### One Main Concept

Each experiment should have one primary learning objective.

For example:

```text
RabbitMQ Lab

Producer
   │
   │ message
   ▼
RabbitMQ
   │
   ▼
Consumer
```

The goal is to understand message queues, not to build an entire e-commerce application.

---

### Break Things Intentionally

Some labs intentionally simulate failures.

Examples:

```text
Service A
   │
   ▼
Service B
   ❌
```

This allows experimentation with:

- retries
- timeouts
- circuit breakers
- fallbacks
- dead-letter queues

Understanding failure scenarios is an important part of learning distributed systems.

---

### Document What Was Learned

Each lab should include its own README explaining:

```text
Goal

Architecture

Concepts explored

How it works

How to run it

Experiments

What I learned

Possible improvements
```

The documentation is part of the learning process.

---

## Example Lab

A typical experiment could look like:

```text
Order Service
      │
      │ gRPC
      ▼
Inventory Service
      │
      │ event
      ▼
RabbitMQ
      │
      ▼
Notification Worker
```

This small architecture can already demonstrate several concepts:

- synchronous service communication
- asynchronous messaging
- service boundaries
- event-driven architecture
- failure handling
- distributed tracing

without requiring a large application.

---

## Goals

Through these experiments, I want to develop a deeper understanding of:

- Backend architecture
- Distributed systems
- Service communication
- Asynchronous processing
- System reliability
- Scalability
- Observability
- Infrastructure
- Software architecture trade-offs

The objective is not only to know **how to use a technology**, but also to understand:

> When should I use it?

> Why does it exist?

> What problem does it solve?

> What trade-offs does it introduce?

---

## Current Focus

The first experiments focus on communication between services.

```text
gRPC
  ↓
WebSocket
  ↓
Redis
  ↓
RabbitMQ
  ↓
Event-Driven Architecture
  ↓
Microservices
```

More advanced distributed-system concepts will be explored progressively.

---

## Notes

These projects are learning experiments.

They are intentionally simplified and may not include everything required for a production environment, such as:

- advanced authentication
- complete security configuration
- production monitoring
- high availability
- exhaustive testing
- complex deployment strategies

When relevant, production considerations and limitations will be documented inside the corresponding lab.

---

## License

This repository is intended for learning, experimentation, and knowledge sharing.

MIT License.