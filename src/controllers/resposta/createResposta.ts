import { FastifyRequest, FastifyReply } from "fastify";
import { createRespostaService } from "../../services/resposta/createRespostaService";

interface CreateRespostaBody {
  fkIdPergunta: string;
  fkIdUsuario: string;
  resposta: string;
}

class CreateRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkIdPergunta, fkIdUsuario, resposta } = request.body as CreateRespostaBody;

    const createResposta = new createRespostaService();

    try {
      const respostaCriada = await createResposta.execute({ fkIdPergunta, fkIdUsuario, resposta });
      return reply.send(respostaCriada);
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      return reply.status(500).send({ error: "Erro interno ao criar resposta." });
    }
  }
}

export { CreateRespostaController }; 