import { FastifyRequest, FastifyReply } from "fastify";
import { achievementService } from "../../services/conquista/addProgressoConquistaService";

export class AddProgressoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { usuarioId, conquistaId, incremento } = request.body as any;

    try {
      const result = await achievementService.addProgress(
        usuarioId,
        conquistaId,
        incremento
      );

      return reply.send(result);
    } catch (e) {
      console.error(e);
      return reply.status(500).send({ error: "Erro ao atualizar progresso" });
    }
  }
}
