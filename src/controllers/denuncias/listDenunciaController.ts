import { FastifyRequest, FastifyReply } from "fastify";
import { ListDenunciaService } from "../../services/denuncias/listDenunciaService";

class ListDenunciaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listDenuncia = new ListDenunciaService();
        const denuncias = await listDenuncia.execute()

        reply.send(denuncias)
    }
}

export { ListDenunciaController }
