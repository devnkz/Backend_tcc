import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteNotificacaoService } from "../../services/notificacoes/deleteNotificaoService";

export class DeleteNotificacaoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id_notificacao } = request.params as {
      id_notificacao: string;
    };

    const service = new DeleteNotificacaoService();
    const deleted = await service.execute({ id_notificacao });

    reply.send(deleted);
  }
}
