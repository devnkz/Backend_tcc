import { FastifyRequest, FastifyReply } from "fastify";
import { ListPerguntaByIdUserService } from "../../services/pergunta/listPerguntaByIdUser";

class ListPerguntaByIdUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }; // id do usuário

    const service = new ListPerguntaByIdUserService();
    const perguntas = await service.execute(id);

    return reply.send(perguntas);
  }
}

export { ListPerguntaByIdUserController };
