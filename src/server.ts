import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import multipart from "@fastify/multipart";
import path from "path";
import { routes } from "./routes";

const app = fastify({ logger: true });

const start = async () => {
  await app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

   // Servir arquivos estáticos da pasta uploads
  app.register(fastifyStatic, {
    root: path.join(__dirname, "..", "uploads"),
    prefix: "/uploads/", // => acessível em http://localhost:3333/uploads/nome-arquivo.jpg
  });

    await app.register(multipart);

  await app.register(routes);

  try {
    await app.listen({ port: 3333 });
    console.log("Servidor rodando na porta 3333");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
