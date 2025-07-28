import { FastifyRequest, FastifyReply } from "fastify";
import { listCursoService } from "../../services/curso/listCursoService";

class ListCursoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCurso = new listCursoService();

    try {
      const cursos = await listCurso.execute();
      return reply.send(cursos);
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      return reply.status(500).send({ error: "Erro interno ao listar cursos." });
    }
  }
}

export { ListCursoController }; 