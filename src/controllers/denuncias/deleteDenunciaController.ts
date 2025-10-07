import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteDenunciaService } from "../../services/denuncias/deleteDenunciaService";

class DeleteDenunciaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }

        const deleteDenuncia = new DeleteDenunciaService();
        const denuncia = await deleteDenuncia.execute({ id })

        reply.send(denuncia)
    }
}

export { DeleteDenunciaController }
