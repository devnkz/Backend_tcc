import { FastifyRequest, FastifyReply } from "fastify";
import { ListNotificacaoService } from "../../services/notificacoes/listNotificacaoService";

export class ListNotificacaoByUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const service = new ListNotificacaoService();
    const list = await service.executeByUser(id);
    reply.send(list);
  }
}
