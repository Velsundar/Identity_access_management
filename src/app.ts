import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import "module-alias/register";
//import Agenda from "agenda";
// import fastifyServerTimeout from "fastify-server-timeout";

export type AppOptions = {
  // Place your custom options for app below here.
  
} & Partial<AutoloadPluginOptions>;
const isProduction = process.env.NODE_ENV === 'production';

export const ROUTE_PREFIX = "api/v1/"
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};
export const projectSourceDir = __dirname;
const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
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
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir:join(__dirname, "./entry-point/http/api"),
    options: { ...opts, prefix: ROUTE_PREFIX },
  });
};
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


export default app;
export { app, options };
