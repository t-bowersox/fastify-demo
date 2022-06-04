import envSchema, { fastifyEnvOpt } from "@fastify/env";
import fp from "fastify-plugin";
import S from "fluent-json-schema";

export default fp<fastifyEnvOpt>(async (fastify, opts) => {
  const schema = S.object().prop("MONGO_URL", S.string().required());

  const config: fastifyEnvOpt = {
    schema,
    dotenv: true,
  };

  fastify.register(envSchema, config);
});

declare module "fastify" {
  interface FastifyInstance {
    config: {
      MONGO_URL: string;
    };
  }
}
