import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { UnprocessableEntityException } from "../../common/exceptions";

export default function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
    next();
  };
}
