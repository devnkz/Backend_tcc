import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNotificacaoService } from "../../services/notificacoes/createNotificacaoService";

export class CreateNotificacaoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkId_usuario, titulo, mensagem, tipo } = request.body as {
      fkId_usuario: string;
      titulo: string;
      mensagem: string;
      tipo: string;
    };

    const service = new CreateNotificacaoService();
    const created = await service.execute({ fkId_usuario, titulo, mensagem, tipo });
    reply.send(created);
  }
}
