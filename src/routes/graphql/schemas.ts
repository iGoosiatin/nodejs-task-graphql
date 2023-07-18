/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { userType, createUserInputType, changeUserInputType } from './types/user.js';
import { memberType, memberTypeIdEnum } from './types/member.js';
import { createPostInputType, postType } from './types/post.js';
import { createProfileInputType, profileType } from './types/profile.js';


export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(userType),
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(memberTypeIdEnum) },
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
    },
    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    posts: {
      type: new GraphQLList(postType),
    },
    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        dto: { type: createUserInputType }
      },
    },
    changeUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changeUserInputType }
      }
    },
    deleteUser: {
      type: UUIDType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      }
    },
    createPost: {
      type: postType,
      args: {
        dto: { type: createPostInputType }
      },
    },
    createProfile: {
      type: profileType,
      args: {
        dto: { type: createProfileInputType }
      },
    },
  },
});

export const gqlSchema = new GraphQLSchema({ query, mutation });

