import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import fastifyStatic from "@fastify/static"
import multipart from "@fastify/multipart"
import path from "path"
import { routes } from "./routes"
import { Server as SocketIOServer } from "socket.io"
import prismaClient from "./prisma"
import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

// Global error handlers to surface uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION', reason);
});

const app = fastify({ logger: true })

const start = async () => {
  await app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })

  app.register(fastifyStatic, {
    root: path.join(__dirname, "..", "uploads"),
    prefix: "/uploads/",
  })

  await app.register(multipart)
  await app.register(routes)

  // Global Fastify error handler: normalize Prisma errors and service errors
  app.setErrorHandler((error, request, reply) => {
    try {
      // Prisma known request errors (ex: connectivity, record not found)
      if ((error as any)?.constructor?.name === 'PrismaClientKnownRequestError') {
      const code = (error as any).code;
      request.log.error({ code, error }, 'PrismaClientKnownRequestError');
        if (code === 'P1001') {
          return reply.status(503).send({ message: 'Serviço temporariamente indisponível (banco de dados).' });
        }
        if (code === 'P2025') {
          return reply.status(404).send({ message: 'Recurso não encontrado.' });
        }
        if (code === 'P2002') {
          return reply.status(409).send({ message: 'Conflito de dados (valor duplicado).' });
        }
      }

      // If services throw an error with statusCode/status, use it
      const status = (error as any).statusCode || (error as any).status || 500;
      const message = (error as any).message || 'Erro interno do servidor';
      request.log.error(error);
      reply.status(status).send({ message });
    } catch (e) {
      // Fallback
      request.log.error(e, 'Error handler failure');
      reply.status(500).send({ message: 'Erro interno do servidor' });
    }
  })

  // ⚡️ Inicializar Socket.IO após o Fastify estar pronto
  const io = new SocketIOServer(app.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })

  // Presença em memória: socketId -> userId e userId -> Set<socketId>
  const socketToUser = new Map<string, string>();
  const userToSockets = new Map<string, Set<string>>();

  const broadcastOnlineUsers = () => {
    io.emit("online_users", Array.from(userToSockets.keys()));
  };

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("presence", (userId: string) => {
      if (!userId) return;
      socketToUser.set(socket.id, userId);
      if (!userToSockets.has(userId)) userToSockets.set(userId, new Set());
      userToSockets.get(userId)!.add(socket.id);
      broadcastOnlineUsers();
    });

  // Cliente entra no grupo
    socket.on("join", async (groupId) => {
      socket.join(groupId); // usuário entra na sala do grupo
      try {
        const mensagens = await prismaClient.mensagem.findMany({
          where: { fkId_grupo: groupId },
          orderBy: { dataCriacao_Mensagem: "asc" },
          select: {
            id_mensagem: true,
            mensagem: true,
            fkId_usuario: true,
            fkId_grupo: true,
            dataCriacao_Mensagem: true,
            replyToId: true,
          },
        });
        socket.emit("historico", mensagens);
      } catch (e) {
        console.error("Erro ao buscar histórico:", e);
        socket.emit("historico", []);
      }
    });

  // Nova mensagem
    socket.on("nova_mensagem", async (msg) => {
      try {
        const { text, userId, grupoId, replyTo } = msg;
        if (!grupoId || !userId || !text || typeof text !== "string") {
          console.error("Payload de mensagem inválido:", msg);
          return;
        }
        const msgSalva = await prismaClient.mensagem.create({
          data: {
            id_mensagem: randomUUID(),
            mensagem: text,
            fkId_usuario: userId,
            fkId_grupo: grupoId,
            replyToId: replyTo || null,
          },
        });
        io.to(grupoId).emit("mensagem_recebida", msgSalva);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    });

    // Eventos de digitação
    socket.on("typing", ({ userId, grupoId }) => {
      console.log("⌨️ Backend recebeu typing de:", userId, "para grupo:", grupoId);
      socket.to(grupoId).emit("user_typing", { userId });
      console.log("📤 Enviado user_typing para sala:", grupoId);
    });

    socket.on("stop_typing", ({ userId, grupoId }) => {
      console.log("⏹️ Backend recebeu stop_typing de:", userId);
      socket.to(grupoId).emit("user_stop_typing", { userId });
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectou:", socket.id);
      const userId = socketToUser.get(socket.id);
      if (userId) {
        socketToUser.delete(socket.id);
        const set = userToSockets.get(userId);
        if (set) {
          set.delete(socket.id);
          if (set.size === 0) userToSockets.delete(userId);
        }
        broadcastOnlineUsers();
      }
    });
  });

  // Global Fastify error handler: map known Prisma errors and pass friendly responses
  app.setErrorHandler((error, request, reply) => {
    // Prisma known errors expose a `code` property
    const maybeCode = (error as any)?.code;
    if (maybeCode) {
      // Can't reach DB
        if (maybeCode === 'P1001') {
        request.log.error(error, 'Prisma P1001 - database unreachable');
        return reply.status(503).send({ message: 'Serviço temporariamente indisponível (banco de dados).' });
      }
      // Record not found for an operation
      if (maybeCode === 'P2025') {
        return reply.status(404).send({ message: 'Recurso não encontrado.' });
      }
    }

    // If service threw a custom statusCode, use it
    const status = (error as any)?.statusCode || (error as any)?.status || 500;
    const message = (error as any)?.message || 'Erro interno do servidor';
    request.log.error(error);
    reply.status(status).send({ message });
  });


  try {
    // Bind em 0.0.0.0 para evitar problemas de resolução IPv4/IPv6 no Windows/localhost
    await app.listen({ port: 3333, host: "0.0.0.0" })
    console.log("Servidor rodando na porta 3333")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
