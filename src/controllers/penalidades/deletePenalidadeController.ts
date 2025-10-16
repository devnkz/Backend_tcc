import { FastifyRequest, FastifyReply } from "fastify";
import { DeletePenalidadeService } from "../../services/penalidades/deletePenalidadeService";

class DeletePenalidadeController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }

        const deletePenalidade = new DeletePenalidadeService();
        const penalidade = await deletePenalidade.execute({ id })

        reply.send(penalidade)
    }
}

export { DeletePenalidadeController }
