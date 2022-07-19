import cors from "cors";
import "dotenv/config";
import "express-async-errors";
import express, { json } from "express";
import { errorLogger, errorHandler } from "./middleware/error";
import appRouter from "./routes";

const app = express();
app.use(cors());
app.use(json());

app.use(appRouter);

app.use(errorLogger);
app.use(errorHandler);

export default app;
