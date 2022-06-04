import {
  FastifyPluginAsync,
  RequestGenericInterface,
  RouteShorthandOptions,
} from "fastify";
import S from "fluent-json-schema";
import { OptionalId } from "mongodb";
import { Todo } from "../../lib/todo.interface";

export const createTodo: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      body: S.object().prop("name", S.string().required()),
    },
  };

  fastify.post<PostRequest>("/", options, async (request, reply) => {
    const newTodo: Todo = { name: request.body.name, completed: false };

    const todos = fastify.mongo.db?.collection<OptionalId<Todo>>("todos");
    return await todos?.insertOne(newTodo);
  });
};

interface PostRequest extends RequestGenericInterface {
  Body: {
    name: string;
  };
}
