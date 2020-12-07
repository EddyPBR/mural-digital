import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// const PORT = process.env.PORT;
const HOST = process.env.HOST;

class ImageItemController {
  async index(request: Request, response: Response) {
    const directory = path.resolve(__dirname, "..", "..", "public", "assets");

    if (!directory) return response.sendStatus(404);

    try {
      const files = fs.readdirSync(directory);

      const imagesList = files.map((file) => ({
        title: file.split(".")[0],
        url: `${HOST}/public/assets/${file}`,
      }));

      if (!imagesList) return response.json({});

      response.json(imagesList);
    } catch (error) {
      response.sendStatus(404);
    }
  }
}

export default ImageItemController;
