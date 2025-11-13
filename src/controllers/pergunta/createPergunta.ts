import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePerguntaService } from "../../services/pergunta/createPergunta";

class CreatePerguntaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkId_usuario, pergunta, fkId_componente, fkId_curso } = request.body as {
      fkId_usuario: string;
      pergunta: string;
      fkId_curso: string;
      fkId_componente: string;
    };

    try {
      const createPergunta = new CreatePerguntaService();
      const perguntaCriada = await createPergunta.execute({ 
        fkId_usuario, 
        pergunta, 
        fkId_componente, 
        fkId_curso
      });
      return reply.send(perguntaCriada);
    } catch (error: any) {
      console.error("Erro ao criar pergunta:", error.message);
      // return 400 for validation errors, 500 otherwise
      if (error && error.name === "ValidationError") {
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreatePerguntaController };
