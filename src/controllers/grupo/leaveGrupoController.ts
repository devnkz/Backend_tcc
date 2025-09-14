// controllers/grupo/LeaveGrupoController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { LeaveGrupoService } from "../../services/grupo/leaveGrupoService";

class LeaveGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { grupoId } = request.params as { grupoId: string };
    const userId = (request as any).user?.id; // ou de onde você armazenou o userId do token

    if (!userId) {
      return reply.status(401).send({ error: "Usuário não autenticado" });
    }

    const leaveGrupoService = new LeaveGrupoService();

    try {
      const result = await leaveGrupoService.execute(grupoId, userId);
      return reply.send(result);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Erro ao sair do grupo" });
    }
  }
}

export { LeaveGrupoController };
