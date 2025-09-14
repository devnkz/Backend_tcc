import { FastifyRequest, FastifyReply } from "fastify";
import { RemoveMembroService } from "../../services/grupo/removerMembroService";

interface Params {
  grupoId: string;
  membroId: string;
}

class RemoveMembroController {
  async handle(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    const { grupoId, membroId } = request.params;
    const requesterId = (request as any).user?.id;
    if (!requesterId) {
      return reply.status(401).send({ error: "Usuário não autenticado" });
    }

    try {
      const service = new RemoveMembroService();
      const result = await service.execute(requesterId, grupoId, membroId);

      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }
}

export { RemoveMembroController };
