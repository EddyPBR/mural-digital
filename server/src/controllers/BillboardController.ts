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

  async update(request: Request, response: Response) {
    const repository = getRepository(Billboard);
    const { title, title_extended, image_url, text } = request.body;
    const { id } = request.params;

    const exists = await repository.findOne( id );
    if (!exists) {
      return response.sendStatus(404);
    }

    const data = new Date();
    const newData = data.toJSON().slice(0, 10) + " " + data.toJSON().slice(11, 19);

    const billboard = {
      title,
      title_extended,
      image_url,
      text,
      updated_at: newData,
    };

    await repository.update(
      id,
      billboard
    );

    return response.sendStatus(200);
  }

  async delete(request: Request, response: Response) {
    const repository = getRepository(Billboard);
    const { id } = request.params;

    const exists = await repository.findOne( id );
    if (!exists) {
      return response.sendStatus(404);
    }

    try {
      await repository.delete( id );
      return response.sendStatus(200);
    } catch {
      return response.sendStatus(500);
    }
    
  }
}

export default BillboardController;
