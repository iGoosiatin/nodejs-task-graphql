import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ID } from "./common.js";
import { userType } from "./user.js";
import { getUser } from "../resolvers/userResolvers.js";

export interface PostInput {
  title: string;
  content: string;
  authorId: string;
};

export interface Post extends ID, PostInput {}

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: userType as GraphQLObjectType,
      resolve: async (source: Post) => await getUser({ id: source.authorId }),
    },
  }),
});

export const createPostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});