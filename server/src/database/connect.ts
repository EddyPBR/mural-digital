import { createConnection } from "typeorm";

createConnection().then( () => console.log("MURAL DIGITAL > Banco-de-dados: status(200) OK "));
