import { PrismaClient } from "@prisma/client";
import { UserInput } from "../types/user.js";
import { ID, Subscription } from "../types/common.js";

const prisma = new PrismaClient();

export const getUser = async ({ id }: ID) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const createUser = async ({ dto: data }: { dto: UserInput }) => {
  const user = await prisma.user.create({ data });
  return user;
};

const changeUser = async ({ id, dto: data}: ID & { dto: Partial<UserInput> }) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data
    });
    return user;
  } catch {
    return null;
  }
};

const deleteUser = async ({ id }: ID) => {
  try {
    await prisma.user.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

const subscribeTo = async ({ userId: id, authorId }: Subscription) => {
  try {
    const user = prisma.user.update({
      where: { id },
      data: { userSubscribedTo: { create: { authorId } } },
    });
    return user;
  } catch {
    return null;
  }
};

const unsubscribeFrom = async ({ userId: subscriberId, authorId }: Subscription) => {
  try {
    await prisma.subscribersOnAuthors.delete({
      where: { subscriberId_authorId: { subscriberId, authorId } },
    });
  } catch {
    return null;
  }
};


export default {
  user: getUser,
  users: getUsers,
  createUser,
  changeUser,
  deleteUser,
  subscribeTo,
  unsubscribeFrom,
};

export const getUserSubscriptions = async (subscriberId: string) => {
  const subscriptions = await prisma.user.findMany(
    { where: { subscribedToUser: { some: { subscriberId } } } }
  );
  return subscriptions;
};

export const getUserFollowers = async (authorId: string) => {
  const followers = await prisma.user.findMany(
    { where: { userSubscribedTo: { some: { authorId } } } }
  );
  return followers;
};
