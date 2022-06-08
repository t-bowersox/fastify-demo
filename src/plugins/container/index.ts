import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix";
import { asValue, asFunction, Lifetime } from "awilix";
import fp from "fastify-plugin";
import { Db } from "mongodb";
import { TodoController } from "../../lib/todo.controller";

export default fp(async (fastify, opts) => {
  if (!fastify.mongo.db) {
    throw new Error("Error connecting to database");
  }

  fastify.register(fastifyAwilixPlugin);

  diContainer.register({
    mongodb: asValue(fastify.mongo.db),
    todoController: asFunction(({ mongodb }) => new TodoController(mongodb), {
      lifetime: Lifetime.SINGLETON,
    }),
  });
});

declare module "@fastify/awilix" {
  interface Cradle {
    mongodb: Db;
    todoController: TodoController;
  }
}
