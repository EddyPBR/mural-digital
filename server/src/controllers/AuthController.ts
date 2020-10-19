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
    if(!user) return response.status(401).json({"message": "invalid email"});

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return response.status(401).json({"message": "invalid password"})

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" });

    return response.json({
      id: user.id,
      email: user.email,
      token
    });
  }

  async checkAuthenticate(request: Request, response: Response) {
    response.status(200).json({
      "message": "is authenticated"
    });
  }
  
}

export default AuthController;
