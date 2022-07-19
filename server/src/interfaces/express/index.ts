import { Request, Response } from "express";
import { DecodedJwt, SignUserDto } from "../models";
import { CreateTestDto } from "../models/schemas";

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

export interface SignUserReq extends Request {
  body: SignUserDto;
}

export interface PostTestReq extends Request {
  body: CreateTestDto;
}
