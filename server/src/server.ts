import express from "express";
import routes from "./routes";
import cors from "cors";

import "dotenv/config";

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`MURAL DIGITAL > Servidor online em: http://${HOST}:${PORT}/`));
