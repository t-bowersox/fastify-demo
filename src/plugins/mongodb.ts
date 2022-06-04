import fastifyMongodb, { FastifyMongodbOptions } from "@fastify/mongodb";
import fp from "fastify-plugin";

export default fp<FastifyMongodbOptions>(async (fastify, opts) => {
  fastify.register(fastifyMongodb, { url: fastify.config.MONGO_URL });
});
