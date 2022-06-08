import { FastifyAwilixOptions } from "@fastify/awilix";
import fastifyEnv, { fastifyEnvOpt } from "@fastify/env";
import fastifyMongodb from "@fastify/mongodb";
import fp from "fastify-plugin";
import S from "fluent-json-schema";

export default fp<FastifyAwilixOptions>(async (fastify, opt) => {
  const schema = S.object().prop("MONGO_URL", S.string().required());

  const config: fastifyEnvOpt = {
    schema,
    dotenv: true,
  };

  await fastify.register(fastifyEnv, config);
  await fastify.register(fastifyMongodb, { url: fastify.config.MONGO_URL });
});

declare module "fastify" {
  interface FastifyInstance {
    config: {
      MONGO_URL: string;
    };
  }
}
