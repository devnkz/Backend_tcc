import { FastifyRequest, FastifyReply } from "fastify";
import { updateComponenteService } from "../../services/componente/updateComponenteService";

interface UpdateComponenteBody {
  nomeComponente?: string;
  fkIdCurso?: string;
}

interface UpdateComponenteParams {
  id: string;
}

class UpdateComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateComponenteParams;
    const { nomeComponente, fkIdCurso } = request.body as UpdateComponenteBody;

    const updateComponente = new updateComponenteService();

    try {
      const componente = await updateComponente.execute({ id, nomeComponente, fkIdCurso });
      return reply.send(componente);
    } catch (error) {
      console.error("Erro ao atualizar componente:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar componente." });
    }
  }
}

export { UpdateComponenteController }; 