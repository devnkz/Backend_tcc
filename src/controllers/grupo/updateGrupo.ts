import { FastifyRequest, FastifyReply } from "fastify";
import { updateGrupoService } from "../../services/grupo/updateGrupoService";

interface UpdateGrupoBody {
  nome_grupo?: string;
  novosMembrosIds?: string[];
}

interface UpdateGrupoParams {
  id: string;
}

class UpdateGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateGrupoParams;
    const { nome_grupo, novosMembrosIds } = request.body as UpdateGrupoBody;

    const updateGrupo = new updateGrupoService();

    try {
      const grupo = await updateGrupo.execute({ 
        id, 
        nome_grupo,  
        novosMembrosIds 
      });
      return reply.send(grupo);
    } catch (error) {
      console.error("Erro ao atualizar grupo:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar grupo." });
    }
  }
}

export { UpdateGrupoController };
