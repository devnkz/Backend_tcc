import { FastifyRequest, FastifyReply } from "fastify";
import { createPerguntaService } from "../../services/pergunta/createPergunta";

class CreatePerguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { fkIdUsuario, pergunta, fkIdComponent } = request.body as { fkIdUsuario: string, pergunta: string, fkIdComponent: string };

        const createPergunta = new createPerguntaService()
        const Pergunta = await createPergunta.execute({ fkIdUsuario, pergunta, fkIdComponent});

        reply.send(Pergunta);
    }
}

export { CreatePerguntaController };