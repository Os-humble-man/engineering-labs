import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { UserServiceHandlers } from "../generated/users/UserService.js";
import type { ProtoGrpcType } from "../generated/user.js";


import { fileURLToPath } from "node:url";

const PROTO_PATH = fileURLToPath(
  new URL("../proto/user.proto", import.meta.url),
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;;
const UserService = grpcObject.users.UserService;

const handlers: UserServiceHandlers = {
  SayHello: (_call, callback) => {
    callback(null, {
      greeting: "Hello from gRPC",
    });
  },
  GetUser: (call, callback) => {
    const user = users.find((user) => user.id === call.request.id);

    if (!user) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "User not found",
      });

      return;
    }

    callback(null, user);
  },

  ListUsers: (_call, callback) => {
    callback(null, {
      users,
    });
  },
  StreamUsers: (call) => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= users.length) {
        clearInterval(interval);
        call.end();
        return;
      }

      call.write(users[index]);

      index++;
    }, 1000);

    call.on("cancelled", () => {
      console.log("Client cancelled the stream");
      clearInterval(interval);
    });
  },

  ImportUsers: (call, callback) => {
    let count = 0;

    call.on("data", (user) => {
      console.log("Received user:", user);
      count++;
    });

    call.on("end", () => {
      callback(null, {
        count,
      });
    });
  },

  Chat: (call) => {
    call.on("data", (message) => {
      console.log("Received:", message);
      call.write({
        sender: "server",
        message: `Received: ${message.message}`,
      });
    });

    call.on("end", () => {
      call.end();
    });
  },

  SlowOperation: (_call, callback) => {
    console.log("Slow operation started");

    setTimeout(() => {
      callback(null, {
        greeting: "Operation completed",
      });
    }, 5000);
  },
};

const users = [
  {
    id: 1,
    name: "Alice",
  },
  {
    id: 2,
    name: "Bob",
  },
  {
    id: 3,
    name: "John",
  },
];

const server = new grpc.Server();

server.addService(UserService.service, handlers);

const PORT = "0.0.0.0:50051";

server.bindAsync(
  PORT,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("Failled to start gRPC server :", error);
      return;
    }

    console.log(`gRPC server running on port ${port}`);
  },
);
