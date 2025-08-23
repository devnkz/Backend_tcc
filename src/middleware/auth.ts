import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "chave_teste";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ success: false, error: "Token não enviado" });
    }

    const [, token] = authHeader.split(" "); // "Bearer <TOKEN>"
    if (!token) {
      return reply.status(401).send({ success: false, error: "Token inválido" });
    }

    const decoded = jwt.verify(token, SECRET) as { id: string };

    // adiciona o id do usuário no request para usar nas rotas
    (request as any).user = { id: decoded.id };

    // se passar aqui, o token é válido e a rota continua
  } catch (err) {
    return reply.status(401).send({ success: false, error: "Token inválido ou expirado" });
  }
}
