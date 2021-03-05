import mongoose, { Document, Schema } from 'mongoose';

const todoSchema = new Schema({
  name: String,
  description: String,
  done: Boolean,
});

export interface ITodo {
  todoId: string;
  name: string;
  description: string;
  done: boolean;
}

interface ITodoModel extends ITodo, Document {}

export const todoModel = mongoose.model<ITodoModel>('todos', todoSchema);
