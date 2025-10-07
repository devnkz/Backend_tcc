import { FastifyRequest, FastifyReply } from "fastify";
import { ListPenalidadeService } from "../../services/penalidades/listPenalidadeService";

class ListPenalidadeController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listPenalidade = new ListPenalidadeService();
        const penalidades = await listPenalidade.execute()

        reply.send(penalidades)
    }
}

export { ListPenalidadeController }
