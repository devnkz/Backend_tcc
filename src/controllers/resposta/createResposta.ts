import { FastifyRequest, FastifyReply } from "fastify";
import { CreateRespostaService } from "../../services/resposta/createRespostaService";

interface CreateRespostaBody {
  perguntaId: string;
  userId: string;
  conteudo: string;
}

class CreateRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { perguntaId, userId, conteudo } = request.body as CreateRespostaBody;

    try {
      const createResposta = new CreateRespostaService();
      const respostaCriada = await createResposta.execute({ perguntaId, userId, conteudo });

      return reply.send(respostaCriada);
    } catch (error: any) {
      console.error("Erro ao criar resposta:", error.message);
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreateRespostaController };
