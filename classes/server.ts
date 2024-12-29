import express from "express";
import http from "http";
import { SERVER_PORT } from "../global/environment";
import { Server as socketIOServer } from "socket.io";
import { simpleLogger } from "../config/logger";
import { disconectSocket, messageSocket } from "../socket/socket";

export default class Server {
  private static _intance: Server;
  private httpServer: http.Server;
  public app: express.Application;
  public port: number;
  public io: socketIOServer;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = new socketIOServer(this.httpServer, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      },
    });

    this.listenSocket();
  }

  public static get intace() {
    return this._intance || (this._intance = new this());
  }

  private listenSocket() {
    simpleLogger.info("Escuchando conexión -- socket");

    this.io.on("connection", (client) => {
      simpleLogger.info("Cliente conectado");

      messageSocket(client, this.io);
      disconectSocket(client);
    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
