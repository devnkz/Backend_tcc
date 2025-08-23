import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({ logger: true });

const start = async () => {
  await app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

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
