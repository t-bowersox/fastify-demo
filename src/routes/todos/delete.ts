import { ObjectId } from "@fastify/mongodb";
import {
  FastifyPluginAsync,
  RequestGenericInterface,
  RouteShorthandOptions,
} from "fastify";
import S from "fluent-json-schema";

export const deleteTodo: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      params: S.object().prop("id", S.string()),
    },
  };

  const controller = fastify.diContainer.resolve("todoController");

  fastify.delete<DeleteRequest>("/:id", options, async (request, reply) => {
    const id = new ObjectId(request.params.id);
    return controller.deleteTodo(id);
  });
};

interface DeleteRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}
