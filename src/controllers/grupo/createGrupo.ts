import { FastifyRequest, FastifyReply } from "fastify";
import { CreateGrupoService } from "../../services/grupo/createGrupoService";

class CreateGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nome_grupo, membrosIds, createdById } = request.body as {
      nome_grupo: string;
      membrosIds: string[];
      createdById: string;
    };

    const service = new CreateGrupoService();
    const grupo = await service.execute(nome_grupo, membrosIds, createdById);

    return reply.send(grupo);
  }
}

export { CreateGrupoController };
