import { FastifyRequest, FastifyReply } from "fastify";
import { listGrupoService } from "../../services/grupo/listGrupoService";

class ListGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listGrupo = new listGrupoService();

    try {
      const grupos = await listGrupo.execute();
      return reply.send(grupos);
    } catch (error) {
      console.error("Erro ao listar grupos:", error);
      return reply.status(500).send({ error: "Erro interno ao listar grupos." });
    }
  }
}

export { ListGrupoController }; 