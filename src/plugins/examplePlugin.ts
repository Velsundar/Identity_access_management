import { FastifyPluginAsync } from "fastify";

const examplePlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/example', async (request, reply) => {
    return { message: 'This is an example plugin!' };
  });
};

export default examplePlugin;