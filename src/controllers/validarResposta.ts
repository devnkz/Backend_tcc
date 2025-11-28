import type { FastifyRequest, FastifyReply } from "fastify";
import { ValidarRespostaService } from "../services/validarRespostas";

export class ValidarRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {id_resposta}  = request.params as { id_resposta: string };
      const { id_usuario_validador } = request.body as {
        id_usuario_validador: string;
      };

      const service = new ValidarRespostaService();
      const resultado = await service.executar(id_resposta, id_usuario_validador);

     return reply.status(200).send({ sucesso: true, resultado });
    } catch (error: any) {
      return reply.status(400).send({ erro: error.message });
    }
  }
}
