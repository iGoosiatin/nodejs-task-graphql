import { MemberType, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { MemberTypeId } from "../member-types/schemas.js";
import { Post } from "./types/post.js";
import { User } from "./types/user.js";

export interface DataLoaders {
  postsByAuthorIdLoader: DataLoader<string, Post[]>,
  memberTypeLoader: DataLoader<MemberTypeId, MemberType>,
  userSubscriptionsLoader: DataLoader<string, User[]>,
  userFollowersLoader: DataLoader<string, User[]>,
};

export const buildDataLoaders = (prisma: PrismaClient): DataLoaders => {
  const batchGetPostsByAuthorId = async (ids: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: ids as string[] } },
    });

    const postMap = posts.reduce((acc, post) => {
      acc[post.authorId] ? acc[post.authorId].push(post) : acc[post.authorId] = [post];
      return acc;
    }, {} as Record<string, Post[]>);

    return ids.map(id => postMap[id]);
  };

  const batchGetMemberType = async (ids: readonly MemberTypeId[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: ids as MemberTypeId[] }}
    });

    const memberTypeMap = memberTypes.reduce((acc, memberType) => {
      acc[memberType.id] = memberType;
      return acc;
    }, {} as Record<MemberTypeId, MemberType>);

    return ids.map(id => memberTypeMap[id]);
  };

  const batchGetUserSubscriptions = async(ids: readonly string[]) => {
    const subscriptions = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: ids as string[] } }
    });
    const authors = await prisma.user.findMany({
      where: { subscribedToUser: { some: { subscriberId: { in: ids as string[] } } } }
    });

    const authorMap = authors.reduce((acc, author) => {
      acc[author.id] = author;
      return acc;
    }, {} as Record<string, User>);
    
    const subscriptionMap = subscriptions.reduce((acc, { subscriberId, authorId}) => {
      acc[subscriberId] ? acc[subscriberId].push(authorMap[authorId]) : acc[subscriberId] = [authorMap[authorId]];
      return acc;
    }, {} as Record<string, User[]>);

    return ids.map(id => subscriptionMap[id]);
  };

  const batchGetUserFollowers = async(ids: readonly string[]) => {
    const subscriptions = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: ids as string[] } }
    });
    const followers = await prisma.user.findMany({
      where: { userSubscribedTo: { some: { authorId: { in: ids as string[] } } } }
    });

    const followerMap = followers.reduce((acc, follower) => {
      acc[follower.id] = follower;
      return acc;
    }, {} as Record<string, User>);
    
    const subscriptionMap = subscriptions.reduce((acc, { subscriberId, authorId}) => {
      acc[authorId] ? acc[authorId].push(followerMap[subscriberId]) : acc[authorId] = [followerMap[subscriberId]];
      return acc;
    }, {} as Record<string, User[]>);

    return ids.map(id => subscriptionMap[id]);
  }

  return {
    postsByAuthorIdLoader: new DataLoader(batchGetPostsByAuthorId),
    memberTypeLoader: new DataLoader(batchGetMemberType),
    userSubscriptionsLoader: new DataLoader(batchGetUserSubscriptions),
    userFollowersLoader: new DataLoader(batchGetUserFollowers),
  }
};
