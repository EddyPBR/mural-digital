import express from "express";
import { celebrate, Joi } from "celebrate";

import authMiddleware from "@middlewares/authMiddleware";

import UserController from "@controllers/UserController";
import BillboardController from "@controllers/BillboardController";
import AuthController from "@controllers/AuthController";
import ImageItemController from "@controllers/ImageItemController";
import TokenNotificationController from "@controllers/TokenNotificationController";

const userController = new UserController();
const billboardController = new BillboardController();
const authController = new AuthController();
const imageItemController = new ImageItemController();
const tokenNotificationController = new TokenNotificationController();

const routes = express.Router();

// USERS ROUTES
routes.get("/users", userController.index);

routes.get(
  "/users/:id",
  celebrate(
    {
      params: Joi.object().keys({
        id: Joi.string().length(24).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  userController.index
);

routes.post(
  "/users",
  celebrate(
    {
      body: Joi.object().keys({
        email: Joi.string().min(5).required(),
        password: Joi.string().min(4).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authMiddleware,
  userController.create
);

routes.put(
  "/users/:id",
  celebrate(
    {
      body: Joi.object().keys({
        email: Joi.string().min(5).required(),
        password: Joi.string().min(4).required(),
      }),
      params: Joi.object().keys({
        id: Joi.string().length(24).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authMiddleware,
  userController.update
);

routes.delete(
  "/users/:id",
  celebrate(
    {
      params: Joi.object().keys({
        id: Joi.string().length(24).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authMiddleware,
  userController.delete
);

// BILLBOARD ROUTES
routes.get("/billboard", billboardController.index);

routes.get(
  "/billboard/:id",
  celebrate(
    {
      params: Joi.object().keys({
        id: Joi.string().length(24).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  billboardController.index
);

routes.post(
  "/billboard",
  celebrate(
    {
      body: Joi.object().keys({
        title: Joi.string().required(),
        extendedTitle: Joi.string().required(),
        imageUrl: Joi.string().min(15).required(),
        text: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authMiddleware,
  billboardController.create
);

routes.put(
  "/billboard/:id",
  celebrate(
    {
      body: Joi.object().keys({
        title: Joi.string().required(),
        extendedTitle: Joi.string().required(),
        imageUrl: Joi.string().min(15).required(),
        text: Joi.string().required(),
      }),
      params: Joi.object().keys({
        id: Joi.string().length(24).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authMiddleware,
  billboardController.update
);

routes.delete(
  "/billboard/:id",
  celebrate(
    {
      params: Joi.object().keys({
        id: Joi.string().length(24).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authMiddleware,
  billboardController.delete
);

// AUTHENTICATION ROUTES
routes.post("/auth", authController.authenticate);
routes.get("/auth", authMiddleware, authController.checkAuthenticate);

// IMAGES CONTROLLER
routes.get("/uploads", imageItemController.index);

// TOKENS CONTROLLER
routes.get("/tokens", tokenNotificationController.index);
routes.post(
  "/tokens",
  celebrate(
    {
      body: Joi.object().keys({
        data: Joi.string().required(),
        type: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  tokenNotificationController.create
);

routes.get("/tokens/notify", tokenNotificationController.notifyApp);

export default routes;
