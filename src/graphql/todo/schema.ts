import { resolvers } from './resolver';
import { typeDefs } from './type';
import { makeExecutableSchema } from 'graphql-tools';

const todoSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { todoSchema };
