import { FastifyRequest, FastifyReply } from "fastify";
import { deleteTagService } from "../../services/tag/deleteTagService";

interface DeleteTagParams {
  id: string;
}

class DeleteTagController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteTagParams;

    const deleteTag = new deleteTagService();

    try {
      await deleteTag.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar tag:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar tag." });
    }
  }
}

export { DeleteTagController }; 