import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { fileURLToPath } from "node:url";

type User = {
  id: number;
  name: string;
};

type ImportUsersResponse = {
  count: number;
};

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

const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const usersPackage = grpcObject.users as grpc.GrpcObject;
const UserService = usersPackage.UserService as grpc.ServiceClientConstructor;

const sayHello: grpc.handleUnaryCall<
  Record<string, never>,
  { greeting: string }
> = (_call, callback) => {
  callback(null, {
    greeting: "Hello from gRPC",
  });
};

const users: User[] = [
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

const getUser: grpc.handleUnaryCall<
  { id: number },
  { id: number; name: string }
> = (call, callback) => {
  const user = users.find((user) => user.id === call.request.id);

  if (!user) {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "User not found",
    });
    return;
  }
  callback(null, user);
};

const listUsers: grpc.handleUnaryCall<
  Record<string, never>,
  { users: Array<{ id: number; name: string }> }
> = (_call, callback) => {
  callback(null, { users });
};

const streamUsers: grpc.handleServerStreamingCall<
  Record<string, never>,
  User
> = (call) => {
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

  call.on("cancel", () => {
    console.log("Client cancelled the stream");
    clearInterval(interval);
  });
};

const importUsers: grpc.handleClientStreamingCall<User, ImportUsersResponse> = (
  call,
  callback,
) => {
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
};

const server = new grpc.Server();

server.addService(UserService.service, {
  sayHello,
  getUser,
  listUsers,
  streamUsers,
  importUsers,
});

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
