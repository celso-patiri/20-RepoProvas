import { Response } from "express";
import { PostTestReq } from "../interfaces/express";
import testsService from "../services/tests.service";

const create = async (req: PostTestReq, res: Response) => {
  await testsService.create(req.body);
  res.sendStatus(201);
};

export default {
  create,
};
