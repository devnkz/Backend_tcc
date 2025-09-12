import { FastifyRequest, FastifyReply } from "fastify";
import { createTipoUsuarioService } from "../../services/tipoUsuario/createTipoUsuario";

class CreateTipoUsuarioController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { nome } = request.body as { nome: string };

        const createTipoUsuario = new createTipoUsuarioService()
        const TipoUsuario = await createTipoUsuario.execute({ nome });

        reply.send(TipoUsuario);
    }
}

export { CreateTipoUsuarioController };