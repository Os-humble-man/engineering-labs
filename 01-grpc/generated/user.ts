import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from './google/protobuf/Empty.js';
import type { ChatMessage as _users_ChatMessage, ChatMessage__Output as _users_ChatMessage__Output } from './users/ChatMessage.js';
import type { GetUserRequest as _users_GetUserRequest, GetUserRequest__Output as _users_GetUserRequest__Output } from './users/GetUserRequest.js';
import type { GreetingResponse as _users_GreetingResponse, GreetingResponse__Output as _users_GreetingResponse__Output } from './users/GreetingResponse.js';
import type { ImportUsersResponse as _users_ImportUsersResponse, ImportUsersResponse__Output as _users_ImportUsersResponse__Output } from './users/ImportUsersResponse.js';
import type { User as _users_User, User__Output as _users_User__Output } from './users/User.js';
import type { UserServiceClient as _users_UserServiceClient, UserServiceDefinition as _users_UserServiceDefinition } from './users/UserService.js';
import type { UsersList as _users_UsersList, UsersList__Output as _users_UsersList__Output } from './users/UsersList.js';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition<_google_protobuf_Empty, _google_protobuf_Empty__Output>
    }
  }
  users: {
    ChatMessage: MessageTypeDefinition<_users_ChatMessage, _users_ChatMessage__Output>
    GetUserRequest: MessageTypeDefinition<_users_GetUserRequest, _users_GetUserRequest__Output>
    GreetingResponse: MessageTypeDefinition<_users_GreetingResponse, _users_GreetingResponse__Output>
    ImportUsersResponse: MessageTypeDefinition<_users_ImportUsersResponse, _users_ImportUsersResponse__Output>
    User: MessageTypeDefinition<_users_User, _users_User__Output>
    UserService: SubtypeConstructor<typeof grpc.Client, _users_UserServiceClient> & { service: _users_UserServiceDefinition }
    UsersList: MessageTypeDefinition<_users_UsersList, _users_UsersList__Output>
  }
}

