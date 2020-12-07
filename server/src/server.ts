import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { errors } from "celebrate";

import routes from "./routes";

import "dotenv/config";

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const URI = `mongodb+srv://${USER}:${PASSWORD}@mural-digital-database.bid4q.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    error
      ? console.log(error.message)
      : console.log("Banco de Dados: status(OK)");
  }
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  "/public/assets",
  express.static(path.resolve(__dirname, "..", "public", "assets"))
);

app.use(errors());

app.listen(PORT, () =>
  console.log(`Servidor online em: http://${HOST}:${PORT}/`)
);
