import { FastifyRequest, FastifyReply } from "fastify";
import { updateArtigoService } from "../../services/artigo/updateArtigoService";

interface UpdateArtigoBody {
  fkIdComponente?: string;
  nomeArtigo?: string;
  textoArtigo?: string;
}

interface UpdateArtigoParams {
  id: string;
}

class UpdateArtigoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateArtigoParams;
    const { fkIdComponente, nomeArtigo, textoArtigo } = request.body as UpdateArtigoBody;

    const updateArtigo = new updateArtigoService();

    try {
      const artigo = await updateArtigo.execute({ id, fkIdComponente, nomeArtigo, textoArtigo });
      return reply.send(artigo);
    } catch (error) {
      console.error("Erro ao atualizar artigo:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar artigo." });
    }
  }
}

export { UpdateArtigoController }; 