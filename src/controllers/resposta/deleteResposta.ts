import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteRespostaService } from "../../services/resposta/deleteRespostaService";

interface DeleteRespostaParams {
  id: string;
  deleteUser: string;
}

class DeleteRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteRespostaParams;
     const deleteUser = (request as any).user?.id;

    const deleteResposta = new DeleteRespostaService();

    try {
      await deleteResposta.execute({ id, deleteUser });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar resposta:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar resposta." });
    }
  }
}

export { DeleteRespostaController }; 