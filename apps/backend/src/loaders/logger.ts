import winston from "winston";
import config from "../config";

const prettyJson = winston.format.printf((info) => {
    if (info.message.constructor === Object) {
        info.message = JSON.stringify(info.message, null, 4);
    }
    return `${info.level}: ${info.message}`;
});

const transports = [];
if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
    transports.push(new winston.transports.Console());
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
            ),
        }),
    );
}

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        prettyJson,
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports,
});

export default LoggerInstance;
