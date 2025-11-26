import type { FastifyRequest, FastifyReply } from "fastify";
import { ForgotPasswordService } from "../services/redefinirSenhaService";

interface ForgotPasswordBody {
  email_usuario: string;
}

export class ForgotPasswordController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email_usuario } = request.body as ForgotPasswordBody;

    console.log("[ForgotPasswordController] Email recebido:", email_usuario);

    const service = new ForgotPasswordService();

    try {
      const result = await service.execute(email_usuario);

      console.log("[ForgotPasswordController] Token gerado para:", email_usuario);

      return reply.status(201).send(result);
    } catch (error: any) {
      console.error("[ForgotPasswordController] Erro:", error);

      const status = error.status || 400;
      const message = error.message || "Erro ao gerar token de redefinição.";

      return reply.status(status).send({ error: message });
    }
  }
}
