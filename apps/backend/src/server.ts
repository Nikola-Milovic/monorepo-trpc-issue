import config from "./config";
import Logger from "./loaders/logger";
import startupSetup from "./loaders/";

import "reflect-metadata"; // We need this in order to use @Decorators
import express from "express";
import { Server } from "http"
let server: Server;

let app: express.Application;

async function startServer() {
    app = express();

    await startupSetup({ expressApp: app });

    server = app
        .listen(config.port, () => {
            Logger.debug(
                `Server listening on port: ${config.port} at ${config.environment} mode`
            );
        })
        .on("error", (err) => {
            Logger.error(err);
            process.exit(1);
        });
}

async function closeGracefully(signal) {
    console.log(`*^!@4=> Received signal to terminate: ${signal}`);

    server.close();
    // await other things we should cleanup nicely
    process.exit();
}

process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);

startServer();

export { app };
