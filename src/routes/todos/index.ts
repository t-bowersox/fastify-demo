import { FastifyPluginAsync } from "fastify";
import { deleteTodo } from "./_delete";
import { getAllTodos, getTodoById } from "./_get";
import { createTodo } from "./_post";
import { updateTodo } from "./_put";

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(createTodo);
  fastify.register(getAllTodos);
  fastify.register(getTodoById);
  fastify.register(updateTodo);
  fastify.register(deleteTodo);
};

export default todos;
