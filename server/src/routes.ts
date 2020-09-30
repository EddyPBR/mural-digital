import express from "express";

import authMiddleware from "./middlewares/authMiddleware";

import UserController from "@controllers/UserController";
import AuthController from "@controllers/AuthController";

const userController = new UserController();
const authController = new AuthController();

const routes = express.Router();

routes.get("/users", authMiddleware, userController.index);
routes.post("/users", userController.create);

routes.post("/auth", authController.authenticate);

export default routes;
