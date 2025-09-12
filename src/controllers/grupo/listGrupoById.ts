import { FastifyRequest, FastifyReply } from "fastify";
import { ListGruposByIdService } from "../../services/grupo/listGrupoById";

interface RequestParams {
  id: string;
}

class ListGruposByIdController {
  async handle(request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) {
    const { id: grupoId } = request.params;

    const service = new ListGruposByIdService();
    const grupo = await service.execute(grupoId);

    if (!grupo) {
      return reply.status(404).send({ message: "Grupo não encontrado" });
    }

    return reply.send(grupo);
  }
}

export { ListGruposByIdController };
