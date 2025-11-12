import { FastifyRequest, FastifyReply } from "fastify";
import { DeletePerguntaService } from "../../services/pergunta/deletePergunta";

class DeletePerguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string};
    const userCtx = (request as any).user || {};
    const deleteUser = userCtx.id as string | undefined;
    const deleteRole = userCtx.role as string | undefined;
    const deleteEmail = userCtx.email as string | undefined;

        const deletePergunta = new DeletePerguntaService;
    const Pergunta = await deletePergunta.execute({ id, deleteUser: deleteUser!, deleteRole, deleteEmail });

        reply.send(Pergunta)
    }
}

export { DeletePerguntaController }