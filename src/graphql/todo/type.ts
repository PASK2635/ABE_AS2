import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    todos: [Todo]
    todo(todoId: String!): Todo
  }

  type Mutation {
    createTodo(todo: TodoInput!): Todo
    updateTodo(todo: TodoInput!): Todo
    deleteTodo(todoId: String!): Boolean
  }

  type Todo {
    _id: ID!
    name: String
    description: String
    done: Boolean
  }

  input TodoInput {
    todoId: String
    name: String
    description: String
    done: Boolean
  }
`;

export { typeDefs };
