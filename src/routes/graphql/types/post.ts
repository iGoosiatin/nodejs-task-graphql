import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ID } from "./common.js";

export interface PostInput {
  title: string;
  content: string;
};

export interface Post extends ID, PostInput {}

export const postType = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
})
