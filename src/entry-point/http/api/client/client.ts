// src/entry-point/http/api/client/client.ts
import { FastifyPluginAsync } from 'fastify';
import { getClients } from '../../../../domain/clients/client.useCase';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const clientRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify
  .withTypeProvider<TypeBoxTypeProvider>()
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get('/hi', async (req, reply) => {
      try {
        await getClients(req, reply);
      } catch (error) {}
    })
  }


export default clientRoutes;
