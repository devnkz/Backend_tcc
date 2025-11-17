import { FastifyRequest, FastifyReply } from "fastify";
import { GetDenunciaByIdService } from "../../services/denuncias/getDenunciaByIdService";

export class GetDenunciaByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const svc = new GetDenunciaByIdService();
      const denuncia = await svc.execute(id);
      if (!denuncia) return reply.code(404).send({ message: "Denúncia não encontrada" });
      return reply.send(denuncia);
    } catch (err) {
      return reply.code(500).send({ message: "Erro ao buscar denúncia", error: err });
    }
  }
}
