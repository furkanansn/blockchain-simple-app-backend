import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { users } from ".";
import User from "./models/User";
import BlockService from "./services/block.service";

export function connectWebsocket(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    serveClient: false,
    path: "/websocket",
    cors: {
      methods: ["GET", "POST"],
      origin: process.env.FRONT_END_URL,
    },
  });

  io.on("connect", async (socket) => {
    const blocks = await BlockService.getBlocksOfToday();
    socket.emit("blocks", blocks);

    const room = socket.handshake.auth.room as string;
    await socket.join(room);

    const user = new User();
    user.room = room;
    user.socketId = socket.id;
    user.subscriptions = [];
    users.push(user);

    socket.on("subscribe", (socket) => {
      users.forEach((element) => {
        if (element.socketId === socket.socketId) {
          element.subscriptions.push({ hash: socket.hash, bits: socket.bits });
        }
      });      
    });

    socket.on("unSubscribe", (socket) => {
      users.forEach((element) => {
        if (element.socketId === socket.socketId) {
          element.subscriptions = element.subscriptions.filter(
            (sub) => sub.hash !== socket.hash
          );
        }
      });      
    });

    socket.on("disconnect", () => {
      const newUsers = users.filter((user) => user.socketId !== socket.id);
      users.length = 0;
      users.push(...newUsers);
      socket.disconnect();
    });
  });

  return io;
}
