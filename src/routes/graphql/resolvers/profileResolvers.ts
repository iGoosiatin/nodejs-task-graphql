import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";
import { ProfileInput } from "../types/profile.js";

const prisma = new PrismaClient();

const getProfile = async (args: ID) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: args.id,
    },
  });
  return profile;
};

const getProfiles = async () => {
  const profiles = await prisma.profile.findMany();
  return profiles;
}

const createProfile = async (args: { dto: ProfileInput }) => {
  const profile = await prisma.profile.create({
    data: args.dto,
  });
  return profile;
};

export default {
  profile: getProfile,
  profiles: getProfiles,
  createProfile,
};

export const getProfileByUserId = async (userId: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId }
  });
  return profile;
};
