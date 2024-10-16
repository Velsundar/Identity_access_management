import { FastifyReply, FastifyRequest } from 'fastify';

const clients = [
  { id: 1, name: 'Client One' },
  { id: 2, name: 'Client Two' },
  { id: 3, name: 'Client Three' },
];

export const getClients = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send(clients);
};
