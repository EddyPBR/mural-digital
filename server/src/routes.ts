import express from "express";

import authMiddleware from "./middlewares/authMiddleware";

import UserController from "@controllers/UserController";
import AuthController from "@controllers/AuthController";
import Billboard from "@controllers/BillboardController";

const userController = new UserController();
const authController = new AuthController();
const billboard = new Billboard();

const routes = express.Router();

routes.get("/users", authMiddleware, userController.index);
routes.post("/users", userController.create);

routes.post("/auth", authController.authenticate);

routes.get("/billboard", billboard.index);
routes.post("/billboard", billboard.create);

export default routes;
