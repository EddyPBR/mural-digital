import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "@models/UserModel";

import verifyObjectValues from "../utils/verifyObjectValues";

class UserController {
  async index(request: Request, response: Response) {
    return response.send({ userID: request.userID });
  }

  async create(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;

    const user = {
      email,
      password,
    };

    if (verifyObjectValues(user) === false) {
      return response.sendStatus(400);
    }

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) return response.sendStatus(409);

    try {
      repository.create(user);

      await repository.save(user);

      return response.json(user);
    } catch {
      return response.sendStatus(500);
    }
  }
}

export default UserController;
