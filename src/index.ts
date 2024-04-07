import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import apiRouter from "./routes/api";
import ResponseBuilder from "./utils/ResponseBuilder";

dotenv.config();

const { PORT } = process.env;
const PUBLIC_DIR = path.join(__dirname, "../public");

const app: Express = express();

const notFoundHandler = (req: Request, res: Response) => {
  return ResponseBuilder.response(
    res,
    404,
    "Resource, data, or page not found",
    "not found"
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err: any, req: Request, res: Response) => {
  return ResponseBuilder.response(
    res,
    err?.statusCode ?? 500,
    err.message,
    err.name
  );
};

app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/v1/api", apiRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT || 3000, () => {
  process.stdout.write(
    `🚀 Server ready (environment: ${process.env.NODE_ENV})`
  );
});
