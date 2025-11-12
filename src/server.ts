import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import fastifyStatic from "@fastify/static"
import multipart from "@fastify/multipart"
import path from "path"
import { routes } from "./routes"
import { Server as SocketIOServer } from "socket.io"
import prismaClient from "./prisma"

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
          // Não usar include avançado para evitar erro de tipos desatualizados
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
        const { text, userId, grupoId } = msg;
        if (!grupoId || !userId || !text || typeof text !== "string") {
          console.error("Payload de mensagem inválido:", msg);
          return;
        }
        const msgSalva = await prismaClient.mensagem.create({
          data: {
            mensagem: text,
            fkId_usuario: userId,
            fkId_grupo: grupoId,
          },
        });
        io.to(grupoId).emit("mensagem_recebida", msgSalva);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
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
