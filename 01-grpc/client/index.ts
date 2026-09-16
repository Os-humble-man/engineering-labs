import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { fileURLToPath } from "node:url";

type User = {
  id: number;
  name: string;
};
type ChatMessage = {
  sender: string;
  message: string;
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

const client = new UserService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

type UserServiceClient = grpc.Client & {
  sayHello(
    request: Record<string, never>,
    callback: (
      error: grpc.ServiceError | null,
      response: { greeting: string },
    ) => void,
  ): grpc.ClientUnaryCall;

  getUser(
    request: { id: number },
    callback: (error: grpc.ServiceError | null, response: User) => void,
  ): grpc.ClientUnaryCall;

  listUsers(
    request: Record<string, never>,
    callback: (
      error: grpc.ServiceError | null,
      response: { users: User[] },
    ) => void,
  ): grpc.ClientUnaryCall;

  streamUsers(request: Record<string, never>): grpc.ClientReadableStream<User>;

  importUsers(
    callback: (
      error: grpc.ServiceError | null,
      response: { count: number },
    ) => void,
  ): grpc.ClientWritableStream<User>;

  chat(): grpc.ClientDuplexStream<ChatMessage, ChatMessage>;
};

const userClient = client as unknown as UserServiceClient;

userClient.sayHello({}, (error, reponse) => {
  if (error) {
    console.error("gRPC error :", error);
    return;
  }

  console.log("Response :", reponse);
});

userClient.getUser({ id: 999 }, (error, response) => {
  if (error) {
    console.error(error.details);
    return;
  }

  console.log("User:", response);
});

userClient.listUsers({}, (error, response) => {
  if (error) {
    console.error(error.details);
    return;
  }

  console.log(response);
});

const stream = userClient.streamUsers({});

const importStream = userClient.importUsers((error, response) => {
  if (error) {
    console.error("Import error:", error.details);
    return;
  }

  console.log("Import completed:", response);
});

stream.on("data", (user) => {
  console.log("Received:", user);
  console.log("...");
});

stream.on("end", () => {
  console.log("Stream ended");
});

stream.on("error", (error) => {
  console.error("Stream error:", error.message);
});

const newUsers: User[] = [
  { id: 10, name: "Paul" },
  { id: 11, name: "Sarah" },
  { id: 12, name: "Marc" },
];

let index = 0;

const interval = setInterval(() => {
  if (index >= newUsers.length) {
    clearInterval(interval);
    console.log("Finished sending users");

    importStream.end();

    return;
  }

  const user = newUsers[index];

  console.log("Sending:", user);

  importStream.write(user);

  index++;
}, 1000);

const chatStream = userClient.chat();

chatStream.on("data", (message) => {
  console.log("Server:", message);
});

chatStream.write({
  sender: "client",
  message: "Hello",
});

chatStream.write({
  sender: "client",
  message: "How are you?",
});

chatStream.write({
  sender: "client",
  message: "This is gRPC bidi streaming",
});

// let count = 0;

// stream.on("data",(user) =>{
//   console.log(user);

//   count ++

//   if (count === 2) {
//     stream.cancel()
//   }
// })
