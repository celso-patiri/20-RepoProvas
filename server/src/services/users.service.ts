import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../common/exceptions";
import * as utils from "../common/utils/auth";
import { SignUserDto } from "../interfaces/models";
import usersRepository from "../repositories/users.repository";

const findById = async (id: number) => {
  return usersRepository.findById(id);
};

const findByEmail = async (email: string) => {
  return usersRepository.findByEmail(email);
};

const create = async (user: SignUserDto) => {
  const { email, password } = user;

  const existingUser = await findByEmail(email);
  if (existingUser) throw new ConflictException("Email already registered");

  const hashedPassword = await utils.hashString(password);
  const { id } = await usersRepository.create({ email, password: hashedPassword });
  return utils.createJwt(id, email);
};

const validateCredentials = async (user: SignUserDto) => {
  const { email, password } = user;

  const existingUser = await findByEmail(email);
  if (!existingUser) throw new UnauthorizedException("Invalid credentials");

  try {
    await utils.compareHash(password, existingUser.password);
  } catch (err) {
    throw new UnauthorizedException("Invalid credentials");
  }

  return utils.createJwt(existingUser.id, email);
};

export default {
  findById,
  findByEmail,
  create,
  validateCredentials,
};
