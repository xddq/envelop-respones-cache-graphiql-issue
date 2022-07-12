import { envelop, useSchema, useTiming } from '@envelop/core';
import { useResponseCache } from "@envelop/response-cache"
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'World',
    },
  },
});

const getEnveloped = envelop({
    plugins: [useSchema(schema),
        useTiming({onContextBuildingMeasurement: () => {}}),
        useResponseCache({session: () => null, includeExtensionMetadata:
            true})],
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP(async (req, res) => {
    const { parse, validate, contextFactory, execute } = getEnveloped({ req, res });
    return {
      schema,
      graphiql: true,
      customParseFn: parse,
      customValidateFn: validate,
      customExecuteFn: async args => {
        return execute({
          ...args,
          contextValue: await contextFactory(),
        });
      },
    };
  })
);

app.listen(4000);
