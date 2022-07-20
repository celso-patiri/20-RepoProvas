import { Request, Response } from "express";
import { PostTestReq } from "../interfaces/express";
import testsService from "../services/tests.service";

const create = async (req: PostTestReq, res: Response) => {
  await testsService.create(req.body);
  res.sendStatus(201);
};

const getAllByDiscipline = async (_req: Request, res: Response) => {
  const tests = await testsService.getAllByDiscipline();
  res.status(200).send(tests);
};

const getAllGroupByTeacher = async (_req: Request, res: Response) => {
  const tests = await testsService.getAllGroupByTeacher();
  res.status(200).send(tests);
};

export default {
  create,
  getAllByDiscipline,
  getAllGroupByTeacher,
};
