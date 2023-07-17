import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";

const prisma = new PrismaClient();

const getPost = async (args: ID) => {
  const post = await prisma.post.findUnique({
    where: {
      id: args.id,
    },
  });
  return post;
}

const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
}

export default {
  post: getPost,
  posts: getPosts,
}