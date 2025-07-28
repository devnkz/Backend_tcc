import { FastifyRequest, FastifyReply } from "fastify";
import { listArtigoService } from "../../services/artigo/listArtigoService";

class ListArtigoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listArtigo = new listArtigoService();

    try {
      const artigos = await listArtigo.execute();
      return reply.send(artigos);
    } catch (error) {
      console.error("Erro ao listar artigos:", error);
      return reply.status(500).send({ error: "Erro interno ao listar artigos." });
    }
  }
}

export { ListArtigoController }; 