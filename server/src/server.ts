import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";

import "dotenv/config";
import "./database/connect";

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(PORT, () => console.log(`MURAL DIGITAL > Servidor online em: http://${HOST}:${PORT}/`));
