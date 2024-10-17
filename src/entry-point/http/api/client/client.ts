import { FastifyPluginAsync } from 'fastify';
import createClientUsecase from '@domain/useCases/clients/client.useCase';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { SUCCESS } from '@config/stringConsent';
import { STATUS_CODES } from '@config/responseCode';
import { createErrorResponse, createSuccessResponse } from '@config/responses';

const clientRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/',
      async function (request, reply) {
        const createdClient = await createClientUsecase(request.body); // Pass request.body
        if (createdClient?.status === 'SUCCESS') {
          return reply
            .status(STATUS_CODES.created.code)
            .send(
              createSuccessResponse(
                STATUS_CODES.created,
                createdClient.msg,
                createdClient.data
              )
            );
        } else {
          return reply
            .status(STATUS_CODES.internalServerError.code) // Send the appropriate status code
            .send(
              createErrorResponse(
                STATUS_CODES.internalServerError,
                createdClient?.msg
              )
            );
        }
      }
    );
};

export default clientRoutes;
