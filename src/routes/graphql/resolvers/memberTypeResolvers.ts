import { PrismaClient } from "@prisma/client";
import { MemberTypeID } from "../types/member.js";

const prisma = new PrismaClient();

const getMemberType = async (args: MemberTypeID) => {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id: args.memberTypeId,
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