import { FastifyRequest, FastifyReply } from "fastify";
import { CreateGrupoService } from "../../services/grupo/createGrupoService";

class CreateGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nomeGrupo, fkIdComponente, membrosIds, createdById } = request.body as {
      nomeGrupo: string;
      fkIdComponente: string;
      membrosIds: string[];
      createdById: string;
    };

    const service = new CreateGrupoService();
    const grupo = await service.execute(nomeGrupo, fkIdComponente, membrosIds, createdById);

    return reply.send(grupo);
  }
}

export { CreateGrupoController };
