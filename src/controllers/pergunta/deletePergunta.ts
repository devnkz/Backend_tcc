import { FastifyRequest, FastifyReply } from "fastify";
import { DeletePerguntaService } from "../../services/pergunta/deletePergunta";

class DeletePerguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string};
        const deleteUser = (request as any).user?.id;

        const deletePergunta = new DeletePerguntaService;
        const Pergunta = await deletePergunta.execute({ id, deleteUser });

        reply.send(Pergunta)
    }
}

export { DeletePerguntaController }