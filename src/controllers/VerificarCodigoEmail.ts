
import type { FastifyRequest, FastifyReply } from "fastify";
import { VerifyCodeService } from "../services/VerificarCodigoEmail";

interface verifyCode{
    codigo: string,
    email_usuario: string,
}

class VerifyCodeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      codigo, email_usuario
    } = request.body as verifyCode;

    const acceptVerifyCode = new VerifyCodeService();

    try {
      const verifyCode = await acceptVerifyCode.execute({
        codigo, email_usuario
      });

      return reply.status(201).send(verifyCode);

    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);

      const status = error.status || 400;
      const message = error.message || "Erro interno ao criar usuário.";

      return reply.status(status).send({ error: message });
    }
  }
}

export { VerifyCodeController };