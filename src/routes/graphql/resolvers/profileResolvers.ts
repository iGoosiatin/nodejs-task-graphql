import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";

const prisma = new PrismaClient();

const getProfile = async (args: ID) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: args.id,
    },
  });
  return profile;
}

const getProfiles = async () => {
  const profiles = await prisma.profile.findMany();
  return profiles;
}

export default {
  profile: getProfile,
  profiles: getProfiles,
}