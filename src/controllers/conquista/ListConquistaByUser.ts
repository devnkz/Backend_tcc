import { FastifyRequest, FastifyReply } from "fastify";
import { ListConquistasUsuarioService } from "../../services/conquista/ListConquistaByUser";

class ListConquistasUsuarioController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string };

    const service = new ListConquistasUsuarioService();

    try {
      const conquistas = await service.execute({ userId });
      return reply.send(conquistas);
    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: "Erro ao buscar conquistas do usuário" });
    }
  }
}

export { ListConquistasUsuarioController };
