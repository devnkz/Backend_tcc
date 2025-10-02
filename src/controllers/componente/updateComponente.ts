import { FastifyRequest, FastifyReply } from "fastify";
import { updateComponenteService } from "../../services/componente/updateComponenteService";

interface UpdateComponenteBody {
  nome_componente?: string;
  fkId_curso?: string;
}

interface UpdateComponenteParams {
  id: string;
}

class UpdateComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateComponenteParams;
    const { nome_componente, fkId_curso } = request.body as UpdateComponenteBody;

    const updateComponente = new updateComponenteService();

    try {
      const componente = await updateComponente.execute({ 
        id, 
        nome_componente, 
        fkId_curso 
      });
      return reply.send(componente);
    } catch (error) {
      console.error("Erro ao atualizar componente:", error);
      return reply.status(500).send({ error: "Erro interno ao atualizar componente." });
    }
  }
}

export { UpdateComponenteController }; 