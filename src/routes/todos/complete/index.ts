import { ObjectId } from "@fastify/mongodb";
import {
  FastifyPluginAsync,
  RequestGenericInterface,
  RouteShorthandOptions,
} from "fastify";
import Schema from "fluent-json-schema";

const complete: FastifyPluginAsync = async (fastify, opts) => {
  const options: RouteShorthandOptions = {
    schema: {
      params: Schema.object().prop("id", Schema.string()),
    },
  };

  const controller = fastify.diContainer.resolve("todoController");

  fastify.put<PutRequest>("/:id", options, async (request, reply) => {
    const id = new ObjectId(request.params.id);
    return controller.completeTodo(id);
  });
};

export default complete;

interface PutRequest extends RequestGenericInterface {
  Params: {
    id: string;
  };
}
