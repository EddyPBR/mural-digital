import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "@models/UserModel";

import verifyObjectValues from "../utils/verifyObjectValues";

class UserController {
  async index(request: Request, response: Response) {
    const repository = getRepository(User);

    const { id } = request.params;

    const query = id ? [await repository.findOne(id)] : await repository.find();

    const users = query.map((data) => {
      const id = data?.id || "null";
      const email = data?.email || "null";
      return({ id, email });
    })

    return response.json(users);
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
        email: user.email,
      });
    } catch {
      return response.sendStatus(500);
    }
  }

  async update(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;
    const id = request.params;

    const exists = await repository.findOne(id);
    if (!exists) {
      return response.sendStatus(404);
    }

    const data = {
      email,
      password,
    };

    if (verifyObjectValues(data) === false) {
      return response.sendStatus(400);
    }

    try {
      const user = repository.create({
        email,
        password,
      });

      await repository.update(id, user);

      const newBillboard = await repository.findOne(id);

      return response.status(200).json(newBillboard);
    } catch {
      return response.status(500);
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
      return response.status(200).json({
        id: exists.id,
        email: exists.email,
      });
    } catch {
      return response.sendStatus(500);
    }
  }
}

export default UserController;
