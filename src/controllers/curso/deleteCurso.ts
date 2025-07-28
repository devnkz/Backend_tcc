import { FastifyRequest, FastifyReply } from "fastify";
import { deleteCursoService } from "../../services/curso/deleteCursoService";

interface DeleteCursoParams {
  id: string;
}

class DeleteCursoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteCursoParams;

    const deleteCurso = new deleteCursoService();

    try {
      await deleteCurso.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar curso." });
    }
  }
}

export { DeleteCursoController }; 