import { FastifyRequest, FastifyReply } from "fastify";
import { listComentarioService } from "../../services/comentario/listComentarioService";

class ListComentarioController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listComentario = new listComentarioService();

    try {
      const comentarios = await listComentario.execute();
      return reply.send(comentarios);
    } catch (error) {
      console.error("Erro ao listar comentários:", error);
      return reply.status(500).send({ error: "Erro interno ao listar comentários." });
    }
  }
}

export { ListComentarioController }; 