import { FastifyRequest, FastifyReply } from "fastify";
import { deleteComentarioService } from "../../services/comentario/deleteComentarioService";

interface DeleteComentarioParams {
  id: string;
}

class DeleteComentarioController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteComentarioParams;

    const deleteComentario = new deleteComentarioService();

    try {
      await deleteComentario.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar comentário:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar comentário." });
    }
  }
}

export { DeleteComentarioController }; 