// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatMessage as _users_ChatMessage, ChatMessage__Output as _users_ChatMessage__Output } from '../users/ChatMessage.js';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty.js';
import type { GetUserRequest as _users_GetUserRequest, GetUserRequest__Output as _users_GetUserRequest__Output } from '../users/GetUserRequest.js';
import type { GreetingResponse as _users_GreetingResponse, GreetingResponse__Output as _users_GreetingResponse__Output } from '../users/GreetingResponse.js';
import type { ImportUsersResponse as _users_ImportUsersResponse, ImportUsersResponse__Output as _users_ImportUsersResponse__Output } from '../users/ImportUsersResponse.js';
import type { User as _users_User, User__Output as _users_User__Output } from '../users/User.js';
import type { UsersList as _users_UsersList, UsersList__Output as _users_UsersList__Output } from '../users/UsersList.js';

export interface UserServiceClient extends grpc.Client {
  Chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_users_ChatMessage, _users_ChatMessage__Output>;
  Chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_users_ChatMessage, _users_ChatMessage__Output>;
  chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_users_ChatMessage, _users_ChatMessage__Output>;
  chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_users_ChatMessage, _users_ChatMessage__Output>;
  
  GetUser(argument: _users_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _users_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _users_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _users_GetUserRequest, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  getUser(argument: _users_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  getUser(argument: _users_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  getUser(argument: _users_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  getUser(argument: _users_GetUserRequest, callback: grpc.requestCallback<_users_User__Output>): grpc.ClientUnaryCall;
  
  ImportUsers(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  ImportUsers(metadata: grpc.Metadata, callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  ImportUsers(options: grpc.CallOptions, callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  ImportUsers(callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  importUsers(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  importUsers(metadata: grpc.Metadata, callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  importUsers(options: grpc.CallOptions, callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  importUsers(callback: grpc.requestCallback<_users_ImportUsersResponse__Output>): grpc.ClientWritableStream<_users_User>;
  
  ListUsers(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  ListUsers(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  ListUsers(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  ListUsers(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_users_UsersList__Output>): grpc.ClientUnaryCall;
  
  SayHello(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  
  SlowOperation(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SlowOperation(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SlowOperation(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  SlowOperation(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  slowOperation(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  slowOperation(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  slowOperation(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  slowOperation(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_users_GreetingResponse__Output>): grpc.ClientUnaryCall;
  
  StreamUsers(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_users_User__Output>;
  StreamUsers(argument: _google_protobuf_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_users_User__Output>;
  streamUsers(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_users_User__Output>;
  streamUsers(argument: _google_protobuf_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_users_User__Output>;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  Chat: grpc.handleBidiStreamingCall<_users_ChatMessage__Output, _users_ChatMessage>;
  
  GetUser: grpc.handleUnaryCall<_users_GetUserRequest__Output, _users_User>;
  
  ImportUsers: grpc.handleClientStreamingCall<_users_User__Output, _users_ImportUsersResponse>;
  
  ListUsers: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _users_UsersList>;
  
  SayHello: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _users_GreetingResponse>;
  
  SlowOperation: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _users_GreetingResponse>;
  
  StreamUsers: grpc.handleServerStreamingCall<_google_protobuf_Empty__Output, _users_User>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  Chat: MethodDefinition<_users_ChatMessage, _users_ChatMessage, _users_ChatMessage__Output, _users_ChatMessage__Output>
  GetUser: MethodDefinition<_users_GetUserRequest, _users_User, _users_GetUserRequest__Output, _users_User__Output>
  ImportUsers: MethodDefinition<_users_User, _users_ImportUsersResponse, _users_User__Output, _users_ImportUsersResponse__Output>
  ListUsers: MethodDefinition<_google_protobuf_Empty, _users_UsersList, _google_protobuf_Empty__Output, _users_UsersList__Output>
  SayHello: MethodDefinition<_google_protobuf_Empty, _users_GreetingResponse, _google_protobuf_Empty__Output, _users_GreetingResponse__Output>
  SlowOperation: MethodDefinition<_google_protobuf_Empty, _users_GreetingResponse, _google_protobuf_Empty__Output, _users_GreetingResponse__Output>
  StreamUsers: MethodDefinition<_google_protobuf_Empty, _users_User, _google_protobuf_Empty__Output, _users_User__Output>
}
