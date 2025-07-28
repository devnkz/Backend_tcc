import { FastifyRequest, FastifyReply } from "fastify";
import { listComponenteService } from "../../services/componente/listComponenteService";

class ListComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listComponente = new listComponenteService();

    try {
      const componentes = await listComponente.execute();
      return reply.send(componentes);
    } catch (error) {
      console.error("Erro ao listar componentes:", error);
      return reply.status(500).send({ error: "Erro interno ao listar componentes." });
    }
  }
}

export { ListComponenteController }; 