import {
  FastifyPluginAsync,
  RequestGenericInterface,
  RouteShorthandOptions,
} from "fastify";
import S from "fluent-json-schema";

export const createTodo: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      body: S.object().prop("name", S.string().required()),
    },
  };

  const todoController = fastify.diContainer.resolve("todoController");

  fastify.post<PostRequest>("/", options, async (request, reply) => {
    return todoController.createTodo(request.body.name);
  });
};

interface PostRequest extends RequestGenericInterface {
  Body: {
    name: string;
  };
}
