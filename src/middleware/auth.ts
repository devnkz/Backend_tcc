import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "meuSegredo123@!";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ success: false, error: "Token não enviado" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return reply.status(401).send({ success: false, error: "Token inválido" });
    }

    const decoded = jwt.verify(token, SECRET) as { id: string };

    if (!decoded || !decoded.id) {
      return reply.status(401).send({ success: false, error: "Token inválido" });
    }

    (request as any).user = { id: decoded.id };
    return; // libera a rota
  } catch (err) {
    return reply.status(401).send({ success: false, error: "Token inválido ou expirado" });
  }
}
