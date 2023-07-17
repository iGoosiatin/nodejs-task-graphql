import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { IUUID, UUIDType } from "./uuid.js";

export interface UserInput {
  name: string;
  balance: number;
};

export interface User extends IUUID, UserInput {}

export const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
})

export const createUserInputType = new GraphQLInputObjectType({
  name: "NewUserInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
})

export const updateUserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
})