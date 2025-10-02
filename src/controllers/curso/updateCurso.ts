import { FastifyRequest, FastifyReply } from "fastify";
import { updateCursoService } from "../../services/curso/updateCursoService";

interface UpdateCursoBody {
  nome_curso?: string;
}

interface UpdateCursoParams {
  id: string;
}

class UpdateCursoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateCursoParams;
    const { nome_curso } = request.body as UpdateCursoBody;

    const updateCurso = new updateCursoService();

    try {
      const curso = await updateCurso.execute({ id, nome_curso });
      return reply.send(curso);
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar curso." });
    }
  }
}

export { UpdateCursoController }; 