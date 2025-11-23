import { FastifyRequest, FastifyReply } from "fastify";
import { ListConquistasService } from "../../services/conquista/ListConquistaService";

class ListConquistasController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const service = new ListConquistasService();

    try {
      const conquistas = await service.execute();
      return reply.send(conquistas);
    } catch (error) {
      console.error("Erro ao listar conquistas:", error);
      return reply.status(500).send({ error: "Erro interno ao listar conquistas." });
    }
  }
}

export { ListConquistasController };
