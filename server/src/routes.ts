import ExampleController from '@controllers/ExampleController';
import express from "express";

const exampleController = new ExampleController();

const routes = express.Router();

routes.get("/example", exampleController.index);

export default routes;
