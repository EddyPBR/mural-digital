import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import "dotenv/config";

interface Token {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) return response.sendStatus(401);

  const token = authorization.replace("Bearer", "").trim();

  try {
    const secret = process.env.JWT_SECRET as string;
    const data = jwt.verify(token, secret);

    const { id } = data as Token;

    request.userID = id;

    return next();
  } catch {
    return response.sendStatus(401);
  }
}