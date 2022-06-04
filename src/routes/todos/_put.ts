import { ObjectId } from "@fastify/mongodb";
import {
  FastifyPluginAsync,
  RequestGenericInterface,
  RouteShorthandOptions,
} from "fastify";
import S from "fluent-json-schema";
import { Todo } from "../../lib/todo.interface";

export const updateTodo: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      params: S.object().prop("id", S.string()),
      body: S.object().prop("name", S.string()),
    },
  };

  fastify.put<PutRequest>("/:id", options, async (request, reply) => {
    const id = new ObjectId(request.params.id);
    const updateDoc = {
      $set: {
        name: request.body.name,
      },
    };
    return await fastify.mongo.db
      ?.collection<Todo>("todos")
      .updateOne({ _id: id }, updateDoc);
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
