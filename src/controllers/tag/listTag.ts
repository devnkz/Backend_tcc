import { FastifyRequest, FastifyReply } from "fastify";
import { listTagService } from "../../services/tag/listTagService";

class ListTagController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listTag = new listTagService();

    try {
      const tags = await listTag.execute();
      return reply.send(tags);
    } catch (error) {
      console.error("Erro ao listar tags:", error);
      return reply.status(500).send({ error: "Erro interno ao listar tags." });
    }
  }
}

export { ListTagController }; 