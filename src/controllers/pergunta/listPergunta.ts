import { FastifyRequest, FastifyReply } from "fastify";
import { ListPerguntaService } from "../../services/pergunta/listPergunta";

class ListPeguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listPergunta = new ListPerguntaService();
        const pergunta = await listPergunta.execute()

        reply.send(pergunta)
    }
}

export { ListPeguntaController }