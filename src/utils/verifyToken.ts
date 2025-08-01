import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "7qRO7AZLTpUi1pnoPSAo2nBFJBlDPn6S0P4iQw9gDuzujJDMJ9";

export async function verifyToken(request: FastifyRequest, reply: FastifyReply) {
 const { token } = request.body as { token: string };

  if (!token) {
    return reply.status(400).send({ success: false, error: "Token não enviado" });
  }

  try {
    jwt.verify(token, SECRET);
    return reply.send({ success: true });
  } catch (err) {
    return reply.send({ success: false });
  }
}

