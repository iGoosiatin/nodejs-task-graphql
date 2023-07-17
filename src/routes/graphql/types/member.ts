import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, Kind } from "graphql";
import { MemberTypeId } from '../../member-types/schemas.js'

export interface MemberTypeInput {
  name: string;
  balance: number;
};

export interface MemberTypeID {
  memberTypeId: string;
}

export interface MemberType extends MemberTypeID, MemberTypeInput {}

const isMemberType = (value: unknown): value is MemberTypeId => {
  if (typeof value !== 'string') {
    return false;
  }

  switch (value) {
    case MemberTypeId.BASIC:
    case MemberTypeId.BUSINESS: {
      return true;
    }
    default: {
      return false;
    }
  }
}

export const memberIdType = new GraphQLScalarType({
  name: 'MemberID',
  serialize(value) {
    if (!isMemberType(value)) {
      throw new TypeError('Allowed values are "basic" or "business".');
    }
    return value;
  },
  parseValue(value) {
    if (!isMemberType(value)) {
      throw new TypeError('Allowed values are "basic" or "business".');
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (isMemberType(ast.value)) {
        return ast.value;
      }
    }
    return undefined;
  },
});

export const memberType = new GraphQLObjectType({
  name: "Member",
  fields: {
    id: { type: new GraphQLNonNull(memberIdType) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  },
});
