import { UserInput } from "../types/user.js";
import { Context, ID, NoArgs, SubscriptionMutationInput } from "../types/common.js";

const getUser = async ({ id }: ID, { userLoader }: Context) => {
  const user = await userLoader.load(id);
  return user;
};

const getUsers = async (_: NoArgs, { prisma, userLoader }: Context) => {
  const users = await prisma.user.findMany({
    include: {
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });

  users.forEach(user => {
    userLoader.prime(user.id, user);
  });

  return users;
};

const createUser = async ({ dto: data }: { dto: UserInput }, { prisma }: Context) => {
  const user = await prisma.user.create({ data });
  return user;
};

const changeUser = async ({ id, dto: data}: ID & { dto: Partial<UserInput> }, { prisma }: Context) => {
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

const deleteUser = async ({ id }: ID, { prisma }: Context) => {
  try {
    await prisma.user.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

const subscribeTo = async ({ userId: id, authorId }: SubscriptionMutationInput, { prisma }: Context) => {
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

const unsubscribeFrom = async ({ userId: subscriberId, authorId }: SubscriptionMutationInput, { prisma }: Context) => {
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
