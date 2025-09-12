import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePerguntaService } from "../../services/pergunta/createPergunta";

class CreatePerguntaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId, conteudo, fkIdComponente } = request.body as {
      userId: string;
      conteudo: string;
      fkIdComponente: string;
    };

    try {
      const createPergunta = new CreatePerguntaService();
      const pergunta = await createPergunta.execute({ userId, conteudo, fkIdComponente });
      return reply.send(pergunta);
    } catch (error: any) {
      console.error("Erro ao criar pergunta:", error.message);
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreatePerguntaController };
