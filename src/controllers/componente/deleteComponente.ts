import { FastifyRequest, FastifyReply } from "fastify";
import { deleteComponenteService } from "../../services/componente/deleteComponenteService";

interface DeleteComponenteParams {
  id: string;
}

class DeleteComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteComponenteParams;

    const deleteComponente = new deleteComponenteService();

    try {
      await deleteComponente.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar componente:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar componente." });
    }
  }
}

export { DeleteComponenteController }; 