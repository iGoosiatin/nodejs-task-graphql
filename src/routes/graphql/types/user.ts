import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ID } from "./common.js";
import { profileType } from "./profile.js";
import { getProfileByUserId } from "../resolvers/profileResolvers.js";
import { postType } from "./post.js";
import { getPostsByUserId } from "../resolvers/postResolvers.js";

export interface UserInput {
  name: string;
  balance: number;
};

export interface User extends ID, UserInput {};

export const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { 
      type: profileType,
      resolve: async(source: User) => await getProfileByUserId(source.id),
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async(source: User) => await getPostsByUserId(source.id),
    }
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
