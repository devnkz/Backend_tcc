import { FastifyRequest, FastifyReply } from "fastify";
import { deleteCursoService } from "../../services/curso/deleteCursoService";

interface DeleteCursoParams {
  id: string;
}

interface DeleteCursoQuery {
  force?: string;
}

class DeleteCursoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteCursoParams;
    const { force } = request.query as DeleteCursoQuery;

    const deleteCurso = new deleteCursoService();

    try {
      const result = await deleteCurso.execute({ 
        id, 
        forceDelete: force === "true" 
      });
      
      return reply.status(200).send({
        message: "Curso deletado com sucesso",
        deletedComponents: result.deletedComponents,
        deletedQuestions: result.deletedQuestions,
      });
    } catch (error: any) {
      console.error("Erro ao deletar curso:", error);
      
      // Se for erro de validação (dados vinculados), retorna 409 com detalhes
      if (error.code === "HAS_LINKED_DATA") {
        return reply.status(409).send({ 
          error: error.message,
          code: "HAS_LINKED_DATA",
          componentesCount: error.componentesCount,
          perguntasCount: error.perguntasCount,
        });
      }
      
      return reply.status(500).send({ 
        error: "Erro interno ao deletar curso." 
      });
    }
  }
}

export { DeleteCursoController }; 