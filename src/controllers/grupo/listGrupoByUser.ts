import { FastifyRequest, FastifyReply } from "fastify";
import { ListGruposDoUsuarioService } from "../../services/grupo/listGrupoByUser";

class ListGruposDoUsuarioController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // user vem do middleware authenticate
    const userId = (request as any).user.id;

    const service = new ListGruposDoUsuarioService();
    const grupos = await service.execute(userId);

    return reply.send(grupos);
  }
}

export { ListGruposDoUsuarioController };
