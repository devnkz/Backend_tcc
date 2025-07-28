import { FastifyRequest, FastifyReply } from "fastify";
import { deleteGrupoService } from "../../services/grupo/deleteGrupoService";

interface DeleteGrupoParams {
  id: string;
}

class DeleteGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteGrupoParams;

    const deleteGrupo = new deleteGrupoService();

    try {
      await deleteGrupo.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar grupo:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar grupo." });
    }
  }
}

export { DeleteGrupoController }; 