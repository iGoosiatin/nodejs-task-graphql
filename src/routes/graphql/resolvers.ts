import { PrismaClient } from "@prisma/client";
import { UserInput } from "./types/user.js";
import { IUUID } from "./types/uuid.js";

const prisma = new PrismaClient();

const getUser = async (args: {id: string}) => {
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

const changeUser = async (args: IUUID & { user: Partial<UserInput>}) => {
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

const deleteUser = async (args: IUUID) => {
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
