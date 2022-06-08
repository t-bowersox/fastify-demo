import { ObjectId } from "@fastify/mongodb";
import { FastifyPluginAsync, RequestGenericInterface } from "fastify";
import { RouteShorthandOptions } from "fastify/types/route";
import S from "fluent-json-schema";

export const getAllTodos: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      response: {
        200: S.array().items(
          S.object()
            .prop("_id", S.string())
            .prop("name", S.string())
            .prop("completed", S.boolean())
        ),
      },
    },
  };

  const controller = fastify.diContainer.resolve("todoController");

  fastify.get("/", options, async (request, opts) => {
    return controller.getAllTodos();
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

  const controller = fastify.diContainer.resolve("todoController");

  fastify.get<GetOneRequest>("/:id", options, async (request, opts) => {
    console.log(request.params);
    const id = new ObjectId(request.params.id);
    return controller.getTodoById(id);
  });
};

interface GetOneRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}
