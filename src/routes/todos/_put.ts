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
      body: S.object().prop("name", S.string()).prop("completed", S.boolean()),
    },
  };

  interface PutRequest extends RequestGenericInterface {
    Params: {
      id: string;
    };
    Body: Partial<Todo>;
  }

  fastify.put<PutRequest>("/:id", options, async (request, reply) => {
    const id = new ObjectId(request.params.id);
    const updateDoc = {
      $set: {
        name: request.body.name,
        completed: request.body.completed,
      },
    };
    return await fastify.mongo.db
      ?.collection("todos")
      .updateOne({ _id: id }, updateDoc);
  });
};