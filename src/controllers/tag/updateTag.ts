import { FastifyRequest, FastifyReply } from "fastify";
import { updateTagService } from "../../services/tag/updateTagService";

interface UpdateTagBody {
  nomeTag?: string;
  descricaoTag?: string;
}

interface UpdateTagParams {
  id: string;
}

class UpdateTagController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateTagParams;
    const { nomeTag, descricaoTag } = request.body as UpdateTagBody;

    const updateTag = new updateTagService();

    try {
      const tag = await updateTag.execute({ id, nomeTag, descricaoTag });
      return reply.send(tag);
    } catch (error) {
      console.error("Erro ao atualizar tag:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar tag." });
    }
  }
}

export { UpdateTagController }; 