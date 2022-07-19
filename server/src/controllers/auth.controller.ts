import { Response } from "express";
import { SignUserReq } from "../interfaces/express";
import usersService from "../services/users.service";

const signUserUp = async (req: SignUserReq, res: Response) => {
  const token = await usersService.create(req.body);
  res.status(201).send({ token });
};

const signUserIn = async (req: SignUserReq, res: Response) => {
  const token = await usersService.validateCredentials(req.body);
  res.status(201).send({ token });
};

export default {
  signUserUp,
  signUserIn,
};
