import express from "express";
import { SERVER_PORT } from "../global/environment";
import { Server as socketIOServer } from "socket.io"; // Importación corregida
import http from "http";
import { Client } from "socket.io/dist/client";
import { simpleLogger } from "../config/logger";

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
        origin: "http://localhost:4200", // Permite el origen de tu frontend
        methods: ["GET", "POST"], // Métodos permitidos
        allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
        credentials: true, // Permite credenciales (cookies, autorización, etc.)
      },
    });

    this.onSocket();
  }

  public static get intace() {
    return this._intance || (this._intance = new this());
  }

  onSocket() {
    simpleLogger.info("Escuchando conexión -- socket");

    this.io.on("connection", (client) => {
      // Corregido el nombre de 'conennction' a 'connection'
      simpleLogger.info("Cliente conectado");

      // Aquí puedes manejar eventos del cliente, como 'disconnect', 'message', etc.
      client.on("disconnect", () => {
        simpleLogger.info("Cliente desconectado");
      });
    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
