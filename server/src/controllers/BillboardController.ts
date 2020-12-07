import { Request, Response } from "express";

import Billboard from "@models/BillboardModel";

import verifyImage from "@utils/verifyImage";

import axios from "axios";

const HOST = process.env.HOST;

class BillboardController {
  async index(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const billboards = id
        ? await Billboard.findOne({ _id: id })
        : await Billboard.find().sort({createdAt: -1});

      if (!billboards) {
        return response
          .status(404)
          .json({ error: "nenhum anúncio encontrado" });
      }

      return response.status(200).json(billboards);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "foi identificado um erro desconhecido" });
    }
  }

  async create(request: Request, response: Response) {
    const { title, extendedTitle, imageUrl, text } = request.body;

    if (!verifyImage(imageUrl)) {
      return response
        .status(400)
        .json({ error: "URL da imagem não encontrada" });
    }

    try {
      const billboard = await Billboard.create({
        title,
        extendedTitle,
        imageUrl,
        text,
      });

      try {
        await axios.get(`https://${HOST}/tokens/notify`);
      } catch (error) {
        console.log("NOTIFY ERROR:", error);
      }

      return response.status(201).json(billboard);
    } catch (error) {
      return response.status(500).json({ error: "Ocorreu um erro inesperado" });
    }
  }

  async update(request: Request, response: Response) {
    const { title, extendedTitle, imageUrl, text } = request.body;
    const { id } = request.params;

    try {
      await Billboard.findOne({ _id: id });
    } catch (error) {
      return response.status(404).json({ error: "Anúncio não encontrado" });
    }

    if (!verifyImage(imageUrl)) {
      return response
        .status(400)
        .json({ error: "URL da imagem não encontrada" });
    }

    try {
      await Billboard.findByIdAndUpdate(
        { _id: id },
        {
          title,
          extendedTitle,
          imageUrl,
          text,
          updatedAt: new Date(),
        }
      );

      const updatedBillboard = await Billboard.findById({ _id: id });

      return response.status(200).json(updatedBillboard);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Não foi possivel atualizar o anúncio" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await Billboard.findOne({ _id: id });
    } catch (error) {
      return response.status(404).json({ error: "Anúncio não encontrado" });
    }

    try {
      const updatedBillboard = await Billboard.findByIdAndDelete({ _id: id });
      return response.status(200).json(updatedBillboard);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Não foi possivel remover o anúncio" });
    }
  }
}

export default BillboardController;
