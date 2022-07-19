import { Router } from "express";
import authRouter from "./auth.router";
import testsRouter from "./tests.router";

const appRouter = Router();

appRouter.use(authRouter);
appRouter.use(testsRouter);

export default appRouter;
