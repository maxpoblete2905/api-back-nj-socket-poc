import Server from "./classes/server";
import bodyParser from "body-parser";
import router from "./routes/router";
import cors from "cors";
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/requestLogger";
import { simpleLogger } from "./config/logger";
import { PREFIX } from "./global/environment";

const server = Server.intace;
dotenv.config();

// Habilitar CORS para el frontend en http://localhost:4200
server.app.use(cors({ origin: "http://localhost:4200", credentials: true }));
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use(requestLogger);

server.app.use(PREFIX, router);

// Iniciar el servidor
server.start(() => {
  simpleLogger.info(`Servidor corriendo en el puerto ${server.port}`);
});
