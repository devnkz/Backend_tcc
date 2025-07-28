import { FastifyRequest, FastifyReply } from "fastify";
import { createArtigoService } from "../../services/artigo/createArtigoService";

interface CreateArtigoBody {
  fkIdComponente: string;
  nomeArtigo: string;
  textoArtigo: string;
}

class CreateArtigoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkIdComponente, nomeArtigo, textoArtigo } = request.body as CreateArtigoBody;

    const createArtigo = new createArtigoService();

    try {
      const artigo = await createArtigo.execute({ fkIdComponente, nomeArtigo, textoArtigo });
      return reply.send(artigo);
    } catch (error) {
      console.error("Erro ao criar artigo:", error);
      return reply.status(500).send({ error: "Erro interno ao criar artigo." });
    }
  }
}

export { CreateArtigoController }; 