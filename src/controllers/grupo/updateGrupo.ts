import { FastifyRequest, FastifyReply } from "fastify";
import { updateGrupoService } from "../../services/grupo/updateGrupoService";

interface UpdateGrupoBody {
  nomeGrupo?: string;
  fkIdComponente?: string;
}

interface UpdateGrupoParams {
  id: string;
}

class UpdateGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateGrupoParams;
    const { nomeGrupo, fkIdComponente } = request.body as UpdateGrupoBody;

    const updateGrupo = new updateGrupoService();

    try {
      const grupo = await updateGrupo.execute({ id, nomeGrupo, fkIdComponente });
      return reply.send(grupo);
    } catch (error) {
      console.error("Erro ao atualizar grupo:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar grupo." });
    }
  }
}

export { UpdateGrupoController }; 