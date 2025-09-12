import { FastifyRequest, FastifyReply } from "fastify";
import { CreateComponenteService } from "../../services/componente/createComponenteService";

interface CreateComponenteBody {
  nomeComponente: string;
  fkIdCurso: string;
}

class CreateComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nomeComponente, fkIdCurso } = request.body as CreateComponenteBody;

    const createComponente = new CreateComponenteService();

    try {
      const componente = await createComponente.execute({ nome: nomeComponente, fkIdCurso });
      return reply.send(componente);
    } catch (error: any) {
      console.error("Erro ao criar componente:", error.message);
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreateComponenteController };
