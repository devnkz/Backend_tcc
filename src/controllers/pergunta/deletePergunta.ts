import { FastifyRequest, FastifyReply } from "fastify";
import { DeletePerguntaService } from "../../services/pergunta/deletePergunta";

class DeletePerguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }

        const deletePergunta = new DeletePerguntaService;
        const Pergunta = await deletePergunta.execute({ id })

        reply.send(Pergunta)
    }
}

export { DeletePerguntaController }