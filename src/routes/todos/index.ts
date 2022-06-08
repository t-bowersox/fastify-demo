import { FastifyPluginAsync } from "fastify";
import { deleteTodo } from "./delete";
import { getAllTodos, getTodoById } from "./get";
import { createTodo } from "./post";
import { updateTodo } from "./put";

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(createTodo);
  fastify.register(getAllTodos);
  fastify.register(getTodoById);
  fastify.register(updateTodo);
  fastify.register(deleteTodo);
};

export default todos;
