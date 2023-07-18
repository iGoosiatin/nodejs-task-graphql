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

const deletePost = async (args: ID) => {
  try {
    await prisma.post.delete({
      where: {
        id: args.id,
      },
    });
    return args.id;
  } catch {
    return null;
  }
};

export default {
  post: getPost,
  posts: getPosts,
  createPost,
  deletePost,
};

export const getPostsByUserId = async (authorId: string) => {
  const posts = await prisma.post.findMany({ where: { authorId } });
  return posts;
};
