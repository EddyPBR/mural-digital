import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Billboard from "@models/billboardModel";

class BillboardController {
  async index(request: Request, response: Response) {
    const repository = getRepository(Billboard);

    const billboard = await repository.find();

    return response.json(billboard);
  }

  async create(request: Request, response: Response) {
    const repository = getRepository(Billboard);
    const { title, title_extended, image_url, text } = request.body;

    const data = new Date();
    const newData = data.toJSON().slice(0, 10) + " " + data.toJSON().slice(11, 19);

    const billboard = {
      title,
      title_extended,
      image_url,
      text,
      created_at: newData,
      updated_at: newData,
    };

    await repository.save(billboard);

    return response.json(billboard);
  }
}

export default BillboardController;
