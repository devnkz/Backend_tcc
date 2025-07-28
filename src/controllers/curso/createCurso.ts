import { FastifyRequest, FastifyReply } from "fastify";
import { createCursoService } from "../../services/curso/createCursoService";

interface CreateCursoBody {
  nomeCurso: string;
}

class CreateCursoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nomeCurso } = request.body as CreateCursoBody;

    const createCurso = new createCursoService();

    try {
      const curso = await createCurso.execute({ nomeCurso });
      return reply.send(curso);
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      return reply.status(500).send({ error: "Erro interno ao criar curso." });
    }
  }
}

export { CreateCursoController }; 