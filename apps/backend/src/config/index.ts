import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";
const dev = ENVIRONMENT === "development";
const test = ENVIRONMENT === "test";
const staging = ENVIRONMENT === "staging";

if (dev || test) {
    const envFound = dotenv.config();
    if (envFound.error) {
        // This error should crash whole process

        throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }
}

export default {
    isStaging: staging,
    isTest: test,
    isDev: dev,
    isProd: prod,
    shouldSendEmails: (!test && !dev) || process.env.EMAILS,
    azureEmail: {
        clientId: process.env.AZURE_OAUTH_CLIENT_ID,
        clientSecret: process.env.AZURE_OAUTH_CLIENT_SECRET,
        // scopes: process.env.AZURE_OAUTH_SCOPES,
        tenantId: process.env.AZURE_OAUTH_TENANT_ID,
    },
    /**
     * development, production or local
     */
    environment: ENVIRONMENT,
    /**
     * Port the server will listen on
     */
    port: parseInt(process.env.PORT, 0),

    /**
     * That long string from mlab
     */
    databaseUrl: process.env.MONGODB_URI,

    /**
     * Used by winston logger
     */
    logs: {
        level: prod ? "info" : "debug",
    },

    /**
     * Agenda.js stuff
     */
    /**
     * Agendash config TODO: add agenda
     */

    /**
     * API configs
     */
    api: {
        prefix: "/api",
    },
};
