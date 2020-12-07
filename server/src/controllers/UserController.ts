import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import User from "@models/UserModel";

class UserController {
  async index(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const users = id ? await User.findOne({ _id: id }) : await User.find();

      if (!users) {
        return response.status(404).json({ error: "nenhum usuário encontrado" });
      }

      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({ error: "foi identificado um erro desconhecido" });
    }
  }

  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return response.status(409).send({ error: "Usuário já cadastrado" });
    }

    try {
      const user = await User.create({
        email,
        password,
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({
        message: error,
      });
    }
  }

  async update(request: Request, response: Response) {
    const { email, password } = request.body;
    const { id } = request.params;

    try {
      await User.findOne({ _id: id });
    } catch(error) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    try {
      await User.findByIdAndUpdate({ _id: id}, { 
        email,
        password: bcrypt.hashSync(password, 8)
      });

      const updatedUser = await User.findById({ _id: id });

      return response.status(200).json(updatedUser);
    } catch(error) {
      return response.status(500).json({ error: "Não foi possivel atualizar o usuário" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await User.findOne({ _id: id });
    } catch(error) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    try {
      const updatedUser = await User.findByIdAndDelete({ _id: id });
      return response.status(200).json(updatedUser);
    } catch(error) {
      return response.status(500).json({ error: "Não foi possivel remover o usuário" });
    }
  }
}

export default UserController;
