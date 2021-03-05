import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../../data/todo';
import { ITodo } from '../../data/todo/model';

const resolvers = {
  Query: {
    todos: (parent: any) => getTodos(),
    todo: (parent: any, { todoId }: { todoId: string }) => getTodo(todoId),
  },

  Mutation: {
    createTodo: (parent: any, { todo }: { todo: ITodo }) => createTodo(todo),
    updateTodo: (parent: any, { todo }: { todo: ITodo }) => updateTodo(todo),
    deleteTodo: (parent: any, { todoId }: { todoId: string }) => deleteTodo(todoId),
  },
};

export { resolvers };
