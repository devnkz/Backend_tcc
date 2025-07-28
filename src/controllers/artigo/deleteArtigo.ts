import { FastifyRequest, FastifyReply } from "fastify";
import { deleteArtigoService } from "../../services/artigo/deleteArtigoService";

interface DeleteArtigoParams {
  id: string;
}

class DeleteArtigoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteArtigoParams;

    const deleteArtigo = new deleteArtigoService();

    try {
      await deleteArtigo.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar artigo:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar artigo." });
    }
  }
}

export { DeleteArtigoController }; 