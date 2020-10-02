import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Billboard from "@models/billboardModel";

import getDateAndHour from "../utils/getDateAndHour";
import verifyObjectValues from "../utils/verifyObjectValues";

class BillboardController {
  async index(request: Request, response: Response) {
    const repository = getRepository(Billboard);

    try {
      const billboard = await repository.find();
      return response.json(billboard);
    } catch {
      return response.status(500);
    }
  }

  async create(request: Request, response: Response) {
    const repository = getRepository(Billboard);
    const { title, title_extended, image_url, text } = request.body;

    const newData = getDateAndHour();

    const billboard = {
      title,
      title_extended,
      image_url,
      text,
      created_at: newData,
      updated_at: newData,
    };

    if (verifyObjectValues(billboard) === false) {
      return response.sendStatus(400);
    }

    try {
      await repository.save(billboard);
      return response.status(200).json(billboard);
    } catch {
      return response.sendStatus(500);
    }
  }

  async update(request: Request, response: Response) {
    const repository = getRepository(Billboard);
    const { title, title_extended, image_url, text } = request.body;
    const { id } = request.params;

    const exists = await repository.findOne(id);
    if (!exists) {
      return response.sendStatus(404);
    }

    const newData = getDateAndHour();

    const billboard = {
      title,
      title_extended,
      image_url,
      text,
      updated_at: newData,
    };

    if (verifyObjectValues(billboard) === false) {
      return response.sendStatus(400);
    }

    try {
      await repository.update(id, billboard);

      const newBillboard = repository.findOne(id);

      return response.status(200).json(newBillboard);
    } catch {
      return response.status(500);
    }
  }

  async delete(request: Request, response: Response) {
    const repository = getRepository(Billboard);
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

export default BillboardController;
