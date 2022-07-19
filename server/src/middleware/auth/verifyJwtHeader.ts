import { NextFunction, Response } from "express";
import { UnauthorizedException } from "../../common/exceptions";
import { decodeJwt } from "../../common/utils/jwt";
import { JwtHeaderReq } from "../../interfaces/express";

export default async function verifyJwtHeader(
  req: JwtHeaderReq,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) throw new UnauthorizedException("Bearer token header required");

  try {
    res.locals.user = decodeJwt(token);
  } catch (err) {
    throw new UnauthorizedException("Invalid jwt");
  }

  next();
}
