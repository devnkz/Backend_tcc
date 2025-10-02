import { FastifyRequest, FastifyReply } from "fastify";
import { CreateRespostaService } from "../../services/resposta/createRespostaService";

interface CreateRespostaBody {
  fkId_pergunta: string;
  fkId_usuario: string;
  resposta: string;
}

class CreateRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkId_pergunta, fkId_usuario, resposta } = request.body as CreateRespostaBody;

    try {
      const createResposta = new CreateRespostaService();
      const respostaCriada = await createResposta.execute({ 
        fkId_pergunta, 
        fkId_usuario, 
        resposta 
      });

      return reply.send(respostaCriada);
    } catch (error: any) {
      console.error("Erro ao criar resposta:", error.message);
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreateRespostaController };
