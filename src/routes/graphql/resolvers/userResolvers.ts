import { PrismaClient } from "@prisma/client";
import { UserInput, UserID } from "../types/user.js";

const prisma = new PrismaClient();

const getUser = async (args: UserID) => {
  const user = await prisma.user.findUnique({
    where: {
      id: args.userId,
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

const changeUser = async (args: UserID & { user: Partial<UserInput> }) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: args.userId
      },
      data: args.user
    });
    return user;
  } catch {
    return null;
  }

}

const deleteUser = async (args: UserID) => {
  try {
    await prisma.user.delete({
      where: {
        id: args.userId,
      },
    });
    return args.userId;
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
