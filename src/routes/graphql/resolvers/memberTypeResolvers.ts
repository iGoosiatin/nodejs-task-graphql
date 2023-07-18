import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";

const prisma = new PrismaClient();

export const getMemberType = async ({ id }: ID) => {
  const memberType = await prisma.memberType.findUnique({ where: { id } });
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