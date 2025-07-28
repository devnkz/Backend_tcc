import { FastifyRequest, FastifyReply } from "fastify";
import { deleteRespostaService } from "../../services/resposta/deleteRespostaService";

interface DeleteRespostaParams {
  id: string;
}

class DeleteRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteRespostaParams;

    const deleteResposta = new deleteRespostaService();

    try {
      await deleteResposta.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar resposta:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar resposta." });
    }
  }
}

export { DeleteRespostaController }; 