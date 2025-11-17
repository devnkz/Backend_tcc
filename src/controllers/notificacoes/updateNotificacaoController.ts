import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateNotificacaoService } from "../../services/notificacoes/updateNotificacaoService";

export class UpdateNotificacaoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const id = (request.params as any).id_notificacao;
    const body = request.body as any;
    const { lida } = body;

    const service = new UpdateNotificacaoService();
    const updated = await service.execute({ id_notificacao: id, lida });
    reply.send(updated);
  }
}
