import { PrismaClient } from "@prisma/client";
import { UserInput } from "../types/user.js";
import { ID } from "../types/common.js";

const prisma = new PrismaClient();

const getUser = async (args: ID) => {
  const user = await prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return user;
}

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
}

const createUser = async (args: {user: UserInput }) => {
  const user = await prisma.user.create({
    data: args.user
  });
  return user;
}

const changeUser = async (args: ID & { user: Partial<UserInput> }) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: args.id
      },
      data: args.user
    });
    return user;
  } catch {
    return null;
  }

}

const deleteUser = async (args: ID) => {
  try {
    await prisma.user.delete({
      where: {
        id: args.id,
      },
    });
    return args.id;
  } catch {
    return null;
  }
}

export default {
  user: getUser,
  users: getUsers,
  createUser,
  changeUser,
  deleteUser,
}

export const getUserSubscriptions = async(subscriberId: string) => {
  const subscriptions = await prisma.user.findMany(
    { where: { subscribedToUser: { some: { subscriberId } } } }
  );
  return subscriptions;
}

export const getUserFollowers = async(authorId: string) => {
  const followers = await prisma.user.findMany(
    { where: { userSubscribedTo: { some: { authorId } } } }
  );
  return followers;
}
