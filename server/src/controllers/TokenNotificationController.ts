import { Request, Response } from "express";

import axios from "axios";

import TokenNotification from "@models/TokenNotificationModel";

class TokenNotificationController {
  async index(request: Request, response: Response) {
    try {
      const tokens = await TokenNotification.find();
      return response.status(200).json(tokens);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "foi identificado um erro desconhecido" });
    }
  }

  async create(request: Request, response: Response) {
    const { data, type } = request.body;

    const TokenExists = await TokenNotification.findOne({ token: data });

    if (TokenExists) {
      return response.status(200).send({ alert: "Token já cadastrado" });
    }

    try {
      const token = await TokenNotification.create({
        token: data,
      });

      return response.status(200).json(token);
    } catch (error) {
      return response.status(400).json({
        message: `${error}`,
      });
    }
  }

  async notifyApp(request: Request, response: Response) {
    try {
      const tokens = await TokenNotification.find();

      if(!tokens) return;

      tokens.map(async token => {
        axios.post("https://exp.host/--/api/v2/push/send", {
          to: token.token,
          sound: "default",
          title: "Rally Motos",
          body: "Novo anúncio!",
          data: { data: "" }
        });
      });

      return response.status(200).json(tokens);

    } catch (error) {
      return response
        .status(400)
        .json({ error: "foi identificado um erro desconhecido" });
    }
  }
}

export default TokenNotificationController;
