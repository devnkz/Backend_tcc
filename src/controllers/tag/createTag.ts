import { FastifyRequest, FastifyReply } from "fastify";
import { createTagService } from "../../services/tag/createTagService";

interface CreateTagBody {
  nomeTag: string;
  descricaoTag: string;
}

class CreateTagController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nomeTag, descricaoTag } = request.body as CreateTagBody;

    const createTag = new createTagService();

    try {
      const tag = await createTag.execute({ nomeTag, descricaoTag });
      return reply.send(tag);
    } catch (error) {
      console.error("Erro ao criar tag:", error);
      return reply.status(500).send({ error: "Erro interno ao criar tag." });
    }
  }
}

export { CreateTagController }; 