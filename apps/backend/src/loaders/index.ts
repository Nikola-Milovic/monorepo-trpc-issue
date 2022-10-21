/* eslint-disable @typescript-eslint/no-var-requires */
import config from "@/config";

import dependencyInjectorLoader from "./dependencyInjector";
import expressLoader from "./express";
import Logger from "./logger";
import mongooseLoader from "./mongoose";
// We have to import at least all the events once so they can be triggered
// import "./events";
export default async ({ expressApp }) => {
    config.environment != "test" && (await mongooseLoader());
    Logger.info("DB loaded and connected!");

    await dependencyInjectorLoader();
    Logger.info("✌️ Dependency Injector loaded");

    await expressLoader({ app: expressApp });
    Logger.info("✌️ Express loaded");

    const willSendEmails = config.shouldSendEmails || false;
    Logger.info(`Will send emails : ${  willSendEmails}`);

    Logger.info("✌️ All Systems Loaded");
};
