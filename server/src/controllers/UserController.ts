import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "@models/UserModel";

class UserController {
  async index(request: Request, response: Response) {
    return response.send({ userID: request.userID });
  }

  async create(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) return response.sendStatus(409);

    const user = repository.create({
      email,
      password,
    });

    await repository.save(user);

    return response.json(user);
  }
}

export default UserController;
