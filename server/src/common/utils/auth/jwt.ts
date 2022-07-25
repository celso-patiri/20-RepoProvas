import jwt from "jsonwebtoken";

const SECRET = process.env.ENCRYPTION_SECRET + "";

export const createJwt = (id: number, email: string) => {
  return jwt.sign({ id, email }, SECRET, { expiresIn: "10h" });
};

export const decodeJwt = (token: string) => {
  return jwt.verify(token, SECRET);
};
