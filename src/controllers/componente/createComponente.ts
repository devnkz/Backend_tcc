import { FastifyRequest, FastifyReply } from "fastify";
import { createComponenteService } from "../../services/componente/createComponenteService";

interface CreateComponenteBody {
  nomeComponente: string;
  fkIdCurso: string;
}

class CreateComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nomeComponente, fkIdCurso } = request.body as CreateComponenteBody;

    const createComponente = new createComponenteService();

    try {
      const componente = await createComponente.execute({ nomeComponente, fkIdCurso });
      return reply.send(componente);
    } catch (error) {
      console.error("Erro ao criar componente:", error);
      return reply.status(500).send({ error: "Erro interno ao criar componente." });
    }
  }
}

export { CreateComponenteController }; 