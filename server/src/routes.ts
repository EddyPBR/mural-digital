import express from "express";

import UserController from "@controllers/UserController";

const userController = new UserController();

const routes = express.Router();

routes.post("/users", userController.create);

export default routes;
