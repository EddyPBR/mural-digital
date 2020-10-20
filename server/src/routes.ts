import express from "express";

import authMiddleware from "./middlewares/authMiddleware";

import UserController from "@controllers/UserController";
import AuthController from "@controllers/AuthController";
import BillboardController from "@controllers/BillboardController";
import ImageItemController from "@controllers/ImageItemController";

const userController = new UserController();
const authController = new AuthController();
const billboardController = new BillboardController();
const imageItemController = new ImageItemController();

const routes = express.Router();

routes.get("/uploads", imageItemController.index);

routes.get("/users", userController.index);
routes.get("/users/:id", userController.index);
routes.post("/users", authMiddleware, userController.create);
routes.put("/users/:id", authMiddleware, userController.update);
routes.delete("/users/:id", authMiddleware, userController.delete);

routes.post("/auth", authController.authenticate);
routes.get("/auth", authMiddleware, authController.checkAuthenticate);

routes.get("/billboard", billboardController.index);
routes.get("/billboard/:id", billboardController.index);
routes.post("/billboard", authMiddleware, billboardController.create);
routes.put("/billboard/:id", authMiddleware, billboardController.update);
routes.delete("/billboard/:id", authMiddleware, billboardController.delete);

export default routes;
