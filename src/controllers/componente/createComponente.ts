import { FastifyRequest, FastifyReply } from "fastify";
import { CreateComponenteService } from "../../services/componente/createComponenteService";

interface CreateComponenteBody {
  nome_componente: string;
  fkId_curso: string;
}

class CreateComponenteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nome_componente, fkId_curso } = request.body as CreateComponenteBody;

    const createComponente = new CreateComponenteService();

    try {
      const componente = await createComponente.execute({ 
        nome_componente, 
        fkId_curso 
      });
      return reply.send(componente);
    } catch (error: any) {
      console.error("Erro ao criar componente:", error.message);
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreateComponenteController };
