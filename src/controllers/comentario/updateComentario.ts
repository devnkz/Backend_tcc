import { FastifyRequest, FastifyReply } from "fastify";
import { updateComentarioService } from "../../services/comentario/updateComentarioService";

interface UpdateComentarioBody {
  fkIdResposta?: string;
  fkIdUsuario?: string;
  comentario?: string;
}

interface UpdateComentarioParams {
  id: string;
}

class UpdateComentarioController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateComentarioParams;
    const { fkIdResposta, fkIdUsuario, comentario } = request.body as UpdateComentarioBody;

    const updateComentario = new updateComentarioService();

    try {
      const comentarioAtualizado = await updateComentario.execute({ id, fkIdResposta, fkIdUsuario, comentario });
      return reply.send(comentarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar comentário." });
    }
  }
}

export { UpdateComentarioController }; 