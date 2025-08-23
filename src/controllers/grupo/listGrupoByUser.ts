import { FastifyRequest, FastifyReply } from "fastify";
import { ListGruposDoUsuarioService } from "../../services/grupo/listGrupoByUser";

class ListGruposDoUsuarioController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request.params as any).id;

    const service = new ListGruposDoUsuarioService();
    const grupos = await service.execute(userId);

    return reply.send(grupos);
  }
}

export { ListGruposDoUsuarioController };
