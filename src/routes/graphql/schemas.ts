import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { userType, createUserInputType, updateUserInputType } from './types/user.js';
import { memberIdType, memberType } from './types/member.js';


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
        userId: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(userType),
    },
    memberType: {
      type: memberType,
      args: {
        memberTypeId: { type: new GraphQLNonNull(memberIdType) },
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
    }
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        user: { type: createUserInputType }
      },
    },
    changeUser: {
      type: userType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        user: { type: updateUserInputType }
      }
    },
    deleteUser: {
      type: UUIDType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
      }
    }
  },
});

export const gqlSchema = new GraphQLSchema({ query, mutation });

