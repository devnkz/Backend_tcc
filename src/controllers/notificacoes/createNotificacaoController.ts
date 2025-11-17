import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNotificacaoService } from "../../services/notificacoes/createNotificacaoService";

export class CreateNotificacaoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as any;
    const {
      fkId_usuario,
      titulo,
      mensagem,
      tipo,
      fkId_denuncia,
      fkId_conteudo_denunciado,
      tipo_denuncia,
      nivel_denuncia,
      revisao,
      dataRevisao,
      item_denunciado,
      denunciadoNome,
      fkId_usuario_conteudo,
    } = body;

    const service = new CreateNotificacaoService();
    const created = await service.execute({
      fkId_usuario,
      titulo,
      mensagem,
      tipo,
      fkId_denuncia,
      fkId_conteudo_denunciado,
      tipo_denuncia,
      nivel_denuncia,
      revisao,
      dataRevisao,
      item_denunciado,
      denunciadoNome,
      fkId_usuario_conteudo,
    });
    reply.send(created);
  }
}
