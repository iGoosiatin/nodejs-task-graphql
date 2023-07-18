import { PrismaClient } from "@prisma/client";
import { ID } from "../types/common.js";
import { ProfileInput } from "../types/profile.js";
import { MemberTypeId } from "../../member-types/schemas.js";

const prisma = new PrismaClient();

const getProfile = async ({ id }: ID) => {
  const profile = await prisma.profile.findUnique({ where: { id } });
  return profile;
};

const getProfiles = async () => {
  const profiles = await prisma.profile.findMany();
  return profiles;
}

const createProfile = async ({ dto: data}: { dto: ProfileInput }) => {
  try {
    const profile = await prisma.profile.create({ data });
    return profile;
  } catch {
    return null;
  }
};

const changeProfile = async ({ id, dto: data}: ID & { dto: Partial<ProfileInput> }) => {
  try {
    const profile = await prisma.profile.update({
      where: { id },
      data
    });
    return profile;
  } catch {
    return null;
  }
};

const deleteProfile = async ({ id }: ID) => {
  try {
    await prisma.profile.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

export default {
  profile: getProfile,
  profiles: getProfiles,
  createProfile,
  changeProfile,
  deleteProfile,
};

export const getProfileByUserId = async (userId: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId }
  });
  return profile;
};

export const getProfilesByMemberTypeId = async (memberTypeId: MemberTypeId) => {
  const profiles = await prisma.profile.findMany({ where: { memberTypeId } });
  return profiles;
}
