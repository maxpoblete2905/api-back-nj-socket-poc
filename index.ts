import Server from "./classes/server";
import bodyParser from 'body-parser';
import router from "./routes/router";
import { requestLogger } from "./middlewares/requestLogger";
import { simpleLogger } from "./config/logger";

const server = new Server();

// Middlewares
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use(requestLogger); // Agregamos el middleware de logging
server.app.use('/', router);

server.start(() => {
    simpleLogger.info(`Servidor corriendo en el puerto ${server.port}`);
});
