import { ObjectId } from "@fastify/mongodb";
import { FastifyPluginAsync, RequestGenericInterface } from "fastify";
import { RouteShorthandOptions } from "fastify/types/route";
import S from "fluent-json-schema";
import { Todo } from "../../lib/todo.interface";

export const getAllTodos: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      response: {
        200: S.object().prop("todos", S.array()),
      },
    },
  };

  fastify.get("/", options, async (request, opts) => {
    const todos = await fastify.mongo.db
      ?.collection<Todo>("todos")
      .find({})
      .toArray();
    return { todos };
  });
};

export const getTodoById: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      params: S.object().prop("id", S.string()),
      response: {
        200: S.object()
          .prop("_id", S.string())
          .prop("name", S.string())
          .prop("completed", S.boolean()),
      },
    },
  };

  fastify.get<GetOneRequest>("/:id", options, async (request, opts) => {
    console.log(request.params);
    const id = new ObjectId(request.params.id);
    return await fastify.mongo.db
      ?.collection<Todo>("todos")
      .findOne({ _id: id });
  });
};

interface GetOneRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}
