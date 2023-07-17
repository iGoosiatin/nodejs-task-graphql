import { GraphQLError, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, Kind } from "graphql";
import { MemberTypeId } from '../../member-types/schemas.js'

class InvalidMemberTypeError extends GraphQLError {
  constructor() {
    super('Allowed values are: basic, business');
  }
}

export interface MemberTypeInput {
  name: string;
  balance: number;
};

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
  name: 'MemberTypeId',
  serialize(value) {
    if (!isMemberType(value)) {
      throw new InvalidMemberTypeError();
    }
    return value;
  },
  parseValue(value) {
    if (!isMemberType(value)) {
      throw new InvalidMemberTypeError();
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (isMemberType(ast.value)) {
        return ast.value;
      }
    }
    throw new InvalidMemberTypeError();
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
