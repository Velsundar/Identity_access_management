"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_useCase_1 = require("../../../../domain/clients/client.useCase");
const clientRoutes = async (fastify, options) => {
    fastify
        .withTypeProvider();
    fastify
        .withTypeProvider()
        .get('/hi', async (req, reply) => {
        try {
            await (0, client_useCase_1.getClients)(req, reply);
        }
        catch (error) { }
    });
};
exports.default = clientRoutes;
