import { FastifyRequest, FastifyReply } from "fastify";
import { deleteComponenteService } from "../../services/componente/deleteComponenteService";

interface DeleteComponenteParams {
  id: string;
}

interface DeleteComponenteQuery {
  force?: string;
}

class DeleteComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteComponenteParams;
    const { force } = request.query as DeleteComponenteQuery;

    const deleteComponente = new deleteComponenteService();

    try {
      const result = await deleteComponente.execute({ 
        id, 
        forceDelete: force === "true" 
      });
      
      return reply.status(200).send({
        message: "Componente deletado com sucesso",
        deletedQuestions: result.deletedQuestions,
      });
    } catch (error: any) {
      console.error("Erro ao deletar componente:", error);
      
      // Se for erro de validação (perguntas vinculadas), retorna 409 com detalhes
      if (error.code === "HAS_LINKED_QUESTIONS") {
        return reply.status(409).send({ 
          error: error.message,
          code: "HAS_LINKED_QUESTIONS",
          linkedQuestionsCount: error.count,
        });
      }
      
      return reply.status(500).send({ 
        error: "Erro interno ao deletar componente." 
      });
    }
  }
}

export { DeleteComponenteController }; 