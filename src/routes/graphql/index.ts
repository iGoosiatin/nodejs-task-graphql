import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from "graphql";
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import { resolvers } from './resolvers.js';



const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const response = await graphql({
        schema: gqlSchema,
        rootValue: resolvers,
        variableValues: req.body.variables,
        source: req.body.query
      })
      return response;
    },
  });
};

export default plugin;
