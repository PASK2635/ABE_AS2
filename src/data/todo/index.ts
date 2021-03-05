import { isEmpty } from 'lodash';
import { todoModel, ITodo } from './model';

async function getTodos() {
  return await todoModel.find({});
}

async function getTodo(todoId: string) {
  return await todoModel.findOne({ _id: todoId });
}

async function createTodo(todo: ITodo) {
  const exist = await getTodo(todo.todoId);
  return isEmpty(exist) ? await todoModel.create(todo) : exist;
}

async function updateTodo(todo: ITodo) {
  return await todoModel.findOneAndUpdate({ _id: todo.todoId }, todo, { new: true });
}

async function deleteTodo(todoId: string) {
  const result = await todoModel.deleteOne({ _id: todoId });
  return Boolean(Number(result.ok));
}

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
