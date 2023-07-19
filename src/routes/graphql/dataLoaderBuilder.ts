import { MemberType, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { MemberTypeId } from "../member-types/schemas.js";
import { Post } from "./types/post.js";

export interface DataLoaders {
  postsByAuthorIdLoader: DataLoader<string, Post[]>,
  memberTypeLoader: DataLoader<MemberTypeId, MemberType>,
};

export const buildDataLoaders = (prisma: PrismaClient): DataLoaders => {
  const batchGetPostsByAuthorId = async (ids: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: ids as string[] } },
    });
    return ids.map(id => posts.filter(post => id === post.authorId));
  };

  const batchGetMemberType = async (ids: readonly MemberTypeId[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: ids as MemberTypeId[] }}
    });
    return ids.map(id => memberTypes.find(memberType => id === memberType.id) as MemberType);
  };

  return {
    postsByAuthorIdLoader: new DataLoader(batchGetPostsByAuthorId),
    memberTypeLoader: new DataLoader(batchGetMemberType),
  }
};

