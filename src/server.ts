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

  io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Cliente entra no grupo
  socket.on("join", async (groupId) => {
    socket.join(groupId); // 🔥 usuário entra na "sala" do grupo

    const mensagens = await prismaClient.mensagem.findMany({
      where: { fkId_grupo: groupId },
      orderBy: { dataCriacao_Mensagem: "asc" },
      include: { usuario: true },
    });

    socket.emit("historico", mensagens);
  });

  // Nova mensagem
  socket.on("nova_mensagem", async (msg) => {
    try {
      const { text, userId, grupoId } = msg;

      if (!grupoId || !userId) {
        console.error("Mensagem inválida:", msg);
        return;
      }

      // 💾 Salva no banco
      const msgSalva = await prismaClient.mensagem.create({
        data: {
          mensagem: text,
          fkId_usuario: userId,
          fkId_grupo: grupoId,
        },
      });

      // Busca a mensagem com os dados do usuário
      const msgComUsuario = await prismaClient.mensagem.findUnique({
        where: { id_mensagem: msgSalva.id_mensagem },
        include: { usuario: true },
      });

      // 🔥 Manda só pra galera do grupo
      io.to(grupoId).emit("mensagem_recebida", msgComUsuario);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectou:", socket.id);
  });
});


  try {
    await app.listen({ port: 3333 })
    console.log("Servidor rodando na porta 3333")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
