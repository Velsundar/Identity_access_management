"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.app = exports.projectSourceDir = exports.ROUTE_PREFIX = void 0;
const path_1 = require("path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
require("module-alias/register");
const dotenv_1 = __importDefault(require("dotenv"));
const connect_to_db_1 = require("@data-access/connect-to-db");
const isProduction = process.env.NODE_ENV === 'production';
exports.ROUTE_PREFIX = "api/v1/";
// Pass --options via CLI arguments in command to enable these options.
const options = {};
exports.options = options;
exports.projectSourceDir = __dirname;
const app = async (fastify, opts) => {
    dotenv_1.default.config();
    await (0, connect_to_db_1.connectDB)();
    // fastify.server.setTimeout(60000 * 5); // 5 minutes
    // fastify.server.keepAliveTimeout = 60000 * 5; // 5 minutes
    // fastify.server.headersTimeout = 60000 * 5; // 5 minutes; // Set timeout to 60 seconds (60,000 milliseconds)
    // fastify.register(fastifyServerTimeout, {
    //   serverTimeout: 60000 * 5, // 5 minutes in milliseconds
    // });
    // Place here your custom code!
    // fastify.setValidatorCompiler(TypeBoxValidatorCompiler);
    // Do not touch the following lines
    // This loads all plugins defined in plugins]
    // those should be support plugins that are reused
    // through your application
    void fastify.register(require("@fastify/multipart"), {
        limits: {
            // Set the fileSize limit to 10MB (10 * 1024 * 1024 bytes)
            fileSize: 10 * 1024 * 1024, // 10MB in bytes
        },
        attachFieldsToBody: true
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "plugins"),
        options: opts,
    });
    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "./entry-point/http/api"),
        options: Object.assign(Object.assign({}, opts), { prefix: exports.ROUTE_PREFIX }),
    });
};
exports.app = app;
//
// const agenda = new Agenda({ db: { address: 'mongodb://localhost/your-database-name' } });
// agenda.define('updateCreatedAt', async (job, done) => {
//   try {
//     console.log('Running updateCreatedAt job');
//     done();
//   } catch (error:any) {
//     console.error('Error running updateCreatedAt job:', error);
//
//     done(error);
//   }
// });
// // Start Agenda and connect to MongoDB
// (async () => {
//   await agenda.start();
//   await agenda.every('1 day', 'updateCreatedAt'); // Schedule the job to run every day
//   console.log('Agenda.js is now running');
// })();
exports.default = app;
