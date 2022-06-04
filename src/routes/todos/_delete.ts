import { ObjectId } from "@fastify/mongodb";
import {
  FastifyPluginAsync,
  RequestGenericInterface,
  RouteShorthandOptions,
} from "fastify";
import S from "fluent-json-schema";
import { Todo } from "../../lib/todo.interface";

export const deleteTodo: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      params: S.object().prop("id", S.string()),
    },
  };

  fastify.delete<DeleteRequest>("/:id", options, async (request, reply) => {
    const id = new ObjectId(request.params.id);
    return await fastify.mongo.db
      ?.collection<Todo>("todos")
      .deleteOne({ _id: id });
  });
};

interface DeleteRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}
