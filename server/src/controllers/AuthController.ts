import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@models/UserModel";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401).json({ error: "Senha é inválida" });
    }

    const secret = process.env.JWT_SECRET as string;

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" });

    return response.json({
      id: user.id,
      email: user.email,
      token,
    });
  }

  async checkAuthenticate(request: Request, response: Response) {
    response.status(200).json({
      message: "Usuário autenticado",
    });
  }
}

export default AuthController;
