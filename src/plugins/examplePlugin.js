"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const examplePlugin = async (fastify, options) => {
    fastify.get('/example', async (request, reply) => {
        return { message: 'This is an example plugin!' };
    });
};
exports.default = examplePlugin;
