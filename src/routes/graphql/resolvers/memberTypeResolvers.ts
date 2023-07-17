import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";

const prisma = new PrismaClient();

const getMemberType = async (args: ID) => {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id: args.id,
    },
  });
  return memberType;
}

const getMemberTypes = async () => {
  const memberTypes = await prisma.memberType.findMany();
  return memberTypes;
}

export default {
  memberType: getMemberType,
  memberTypes: getMemberTypes,
}