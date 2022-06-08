import { ObjectId } from "@fastify/mongodb";
import {
  FastifyPluginAsync,
  RequestGenericInterface,
  RouteShorthandOptions,
} from "fastify";
import S from "fluent-json-schema";

export const updateTodo: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      params: S.object().prop("id", S.string()),
      body: S.object().prop("name", S.string().required()),
    },
  };

  const controller = fastify.diContainer.resolve("todoController");

  fastify.put<PutRequest>("/:id", options, async (request, reply) => {
    const id = new ObjectId(request.params.id);
    return controller.updateTodo(id, request.body.name);
  });
};

interface PutRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
  Body: {
    name: string;
  };
}
