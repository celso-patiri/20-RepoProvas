import { Request, Response } from "express";
import { DecodedJwt, SignUserDto } from "../models";

export interface SignUserReq extends Request {
  body: SignUserDto;
}

export interface JwtHeaderReq extends Request {
  headers: { authorization: string };
}

export interface ParamsIdReq extends Request {
  params: {
    id: string;
  };
}

export interface SignedUserRes extends Response {
  locals: {
    user: DecodedJwt;
  };
}
