import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import "dotenv/config";

import User from "@models/UserModel";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;

    const user = await repository.findOne({ where: { email } });
    if(!user) return response.sendStatus(401);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return response.sendStatus(401);

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" });

    return response.json({
      id: user.id,
      email: user.email,
      token
    });
  }
}

export default AuthController;
