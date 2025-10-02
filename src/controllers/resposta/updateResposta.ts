import { FastifyRequest, FastifyReply } from "fastify";
import { updateRespostaService } from "../../services/resposta/updateRespostaService";

interface UpdateRespostaBody {
  fkId_pergunta?: string;
  fkId_usuario?: string;
  resposta?: string;
}

interface UpdateRespostaParams {
  id: string;
}

class UpdateRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateRespostaParams;
    const { fkId_pergunta, fkId_usuario, resposta } = request.body as UpdateRespostaBody;

    const updateResposta = new updateRespostaService();

    try {
      const respostaAtualizada = await updateResposta.execute({ 
        id, 
        fkId_pergunta, 
        fkId_usuario, 
        resposta 
      });
      return reply.send(respostaAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar resposta:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar resposta." });
    }
  }
}

export { UpdateRespostaController }; 