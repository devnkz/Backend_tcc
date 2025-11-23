import { FastifyRequest, FastifyReply } from "fastify";
import { CreateConquistaService } from "../../services/conquista/createConquistaService";

interface CreateConquistaBody {
  titulo: string;
  descricao: string;
  progressoMax: number;
}

class CreateConquistaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { titulo, descricao, progressoMax } = request.body as CreateConquistaBody;

    const service = new CreateConquistaService();

    try {
      const conquista = await service.execute({
        titulo,
        descricao,
        progressoMax,
      });

      return reply.send(conquista);
    } catch (error) {
      console.error("Erro ao criar conquista:", error);
      return reply.status(500).send({ error: "Erro interno ao criar conquista." });
    }
  }
}

export { CreateConquistaController };
