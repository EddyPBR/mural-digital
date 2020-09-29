import { Request, Response } from "express";
import { ExampleModel } from "@models/ExampleModel";

export default class ExampleController {
  index(request: Request, response: Response) {
    const exampleModel = new ExampleModel();

    exampleModel.message = "hello example";

    return response.json(exampleModel);
  }
}

