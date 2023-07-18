import { PrismaClient } from "@prisma/client";

export interface ID {
  id: string;
};

export interface Subscription {
  userId: string;
  authorId: string;
};

export interface NoArgs {
  [key: string]: never
};

export interface Context {
  prisma: PrismaClient;
}