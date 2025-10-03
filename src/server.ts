import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import multipart from "@fastify/multipart";
import path from "path";
import { routes } from "./routes";
import { Server as SocketIOServer } from "socket.io";
import prismaClient from "./prisma";

const app = fastify({ logger: true });

const start = async () => {
  await app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "..", "uploads"),
    prefix: "/uploads/",
  });

  await app.register(multipart);
  await app.register(routes);

  // ⚡️ Inicializar Socket.IO após o Fastify estar pronto
  const io = new SocketIOServer(app.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("join", async () => {
      const mensagens = await prismaClient.mensagem.findMany({
        orderBy: { dataCriacao_Mensagem: "asc" },
        include: { usuario: true },
      });
      socket.emit("historico", mensagens);
    });

    socket.on("nova_mensagem", async (msg) => {
      const msgSalva = await prismaClient.mensagem.create({
        data: { mensagem: msg.text, fkId_usuario: msg.userId },
      });

      const msgComUsuario = await prismaClient.mensagem.findUnique({
        where: { id_mensagem: msgSalva.id_mensagem },
        include: { usuario: true },
      });

      io.emit("mensagem_recebida", msgComUsuario);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectou:", socket.id);
    });
  });

  try {
    await app.listen({ port: 3333 });
    console.log("Servidor rodando na porta 3333");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
