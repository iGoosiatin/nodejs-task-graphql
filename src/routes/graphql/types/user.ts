import { GraphQLFloat, GraphQLInputObjectType, GraphQLInterfaceType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ID } from "./common.js";
import { profileType } from "./profile.js";
import { getProfileByUserId } from "../resolvers/profileResolvers.js";
import { postType } from "./post.js";
import { getPostsByUserId } from "../resolvers/postResolvers.js";
import { getUserFollowers, getUserSubscriptions } from "../resolvers/userResolvers.js";

export interface UserInput {
  name: string;
  balance: number;
};

export interface User extends ID, UserInput {};

export const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
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
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve :async (source: User) => await getUserSubscriptions(source.id),
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve :async (source: User) => await getUserFollowers(source.id),
    }
  }),
});

export const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const changeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
