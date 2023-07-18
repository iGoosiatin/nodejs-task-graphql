import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { memberType, memberTypeIdEnum } from "./member.js";
import { ID } from "./common.js";
import { MemberTypeId } from "../../member-types/schemas.js";
import { getMemberType } from "../resolvers/memberTypeResolvers.js";
import { userType } from "./user.js";
import { getUser } from "../resolvers/userResolvers.js";

export interface ProfileInput {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: MemberTypeId;
  userId: string;
};

export interface Profile extends ID, ProfileInput {};

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(memberType),
      resolve: async (source: Profile) => await getMemberType({id: source.memberTypeId }),
    },
    user: {
      type: userType as GraphQLObjectType,
      resolve: async (source: Profile) => await getUser({ id: source.userId }),
    },
  }),
});

export const createProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: { type: new GraphQLNonNull(memberTypeIdEnum) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  },
});
