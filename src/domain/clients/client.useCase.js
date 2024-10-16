"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClients = void 0;
const clients = [
    { id: 1, name: 'Client One' },
    { id: 2, name: 'Client Two' },
    { id: 3, name: 'Client Three' },
];
const getClients = async (request, reply) => {
    return reply.send(clients);
};
exports.getClients = getClients;
