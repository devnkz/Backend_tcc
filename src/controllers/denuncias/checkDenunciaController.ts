import { FastifyRequest, FastifyReply } from "fastify";
import { CheckDenunciaService } from "../../services/denuncias/checkDenunciaService";

class CheckDenunciaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id_usuario, id_conteudo, tipo_conteudo } = request.query as {
            id_usuario: string;
            id_conteudo: string;
            tipo_conteudo: string;
        };

        const checkDenuncia = new CheckDenunciaService();
        const result = await checkDenuncia.execute({
            id_usuario,
            id_conteudo,
            tipo_conteudo,
        });

        return reply.send(result);
    }
}

export { CheckDenunciaController };
