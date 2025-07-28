import { FastifyRequest, FastifyReply } from "fastify";
import { createGrupoService } from "../../services/grupo/createGrupoService";

interface CreateGrupoBody {
  nomeGrupo: string;
  fkIdComponente: string;
}

class CreateGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nomeGrupo, fkIdComponente } = request.body as CreateGrupoBody;

    const createGrupo = new createGrupoService();

    try {
      const grupo = await createGrupo.execute({ nomeGrupo, fkIdComponente });
      return reply.send(grupo);
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
      return reply.status(500).send({ error: "Erro interno ao criar grupo." });
    }
  }
}

export { CreateGrupoController }; 