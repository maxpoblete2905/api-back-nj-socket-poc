import { Socket } from "socket.io";
import { simpleLogger } from "../config/logger";
import { Server as socketIOServer } from "socket.io";

export const disconectSocket = (cliente: Socket) => {
  cliente.on("disconnect", () => {
    try {
      simpleLogger.info("Cliente desconectado");
    } catch (error) {
      simpleLogger.error("Error al registrar desconexión: ", error);
    }
  });
};

export const messageSocket = (cliente: Socket, io: socketIOServer) => {
  cliente.on("message", (payload: { de: string; cuerpo: string }) => {
    try {
      simpleLogger.info("Mensaje recibido: ", payload);
      io.emit("new-message", payload);
    } catch (error) {
      simpleLogger.error("Error al procesar el mensaje: ", error);
    }
  });
};
