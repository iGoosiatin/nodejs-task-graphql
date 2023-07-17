import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";
import { PostInput } from "../types/post.js";

const prisma = new PrismaClient();

const getPost = async (args: ID) => {
  const post = await prisma.post.findUnique({
    where: {
      id: args.id,
    },
  });
  return post;
};

const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

const createPost = async (args: { dto: PostInput }) => {
  const post = await prisma.post.create({
    data: args.dto
  });
  return post;
};

export default {
  post: getPost,
  posts: getPosts,
  createPost,
};

export const getPostsByUserId = async (authorId: string) => {
  const posts = await prisma.post.findMany({ where: { authorId } });
  return posts;
};
