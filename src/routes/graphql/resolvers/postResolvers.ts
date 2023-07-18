import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";
import { PostInput } from "../types/post.js";

const prisma = new PrismaClient();

const getPost = async ({ id }: ID) => {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
};

const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

const createPost = async ({ dto: data }: { dto: PostInput }) => {
  const post = await prisma.post.create({ data });
  return post;
};

const changePost = async ({ id, dto: data}: ID & { dto: Partial<PostInput> }) => {
  try {
    const post = await prisma.post.update({
      where: { id },
      data,
    });
    return post;
  } catch {
    return null;
  }
};

const deletePost = async ({ id }: ID) => {
  try {
    await prisma.post.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

export default {
  post: getPost,
  posts: getPosts,
  createPost,
  changePost,
  deletePost,
};

export const getPostsByUserId = async (authorId: string) => {
  const posts = await prisma.post.findMany({ where: { authorId } });
  return posts;
};
