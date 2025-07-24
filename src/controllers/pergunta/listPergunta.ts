import { FastifyRequest, FastifyReply } from "fastify";
import { ListPeguntaService } from "../../services/pergunta/listPergunta";

class ListPeguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listPergunta = new ListPeguntaService();
        const pergunta = await listPergunta.execute()

        reply.send(pergunta)
    }
}

export { ListPeguntaController }