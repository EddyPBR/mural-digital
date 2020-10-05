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

    const data = {
      email,
      password,
    };

    if (verifyObjectValues(data) === false) {
      return response.sendStatus(400);
    }

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) return response.sendStatus(409);

    try {
      const user = repository.create({
        email,
        password,
      });

      await repository.save(user);

      return response.json({
        id: user.id,
        email: user.email
      });
      
    } catch {
      return response.sendStatus(500);
    }
  }

  async delete(request: Request, response: Response) {
    const repository = getRepository(User);
    const { id } = request.params;

    const exists = await repository.findOne(id);
    if (!exists) {
      return response.sendStatus(404);
    }

    try {
      await repository.delete(id);
      return response.status(200).json(exists);
    } catch {
      return response.sendStatus(500);
    }
  }
}

export default UserController;
