// import { OpticMiddleware } from "@useoptic/express-middleware";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import config from "../config";
import routes from "../api";



export default ({ app }: { app: express.Application }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Various HTTP headers for security
  app.use(helmet());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());
};
