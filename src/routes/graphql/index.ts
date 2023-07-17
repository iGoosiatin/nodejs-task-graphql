import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from "graphql";
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import rootValue from './resolvers.js';

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
        source: req.body.query,
        rootValue,
        variableValues: req.body.variables,
      })
      return response;
    },
  });
};

export default plugin;
