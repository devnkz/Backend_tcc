import { FastifyRequest, FastifyReply } from "fastify";
import { createTipoUsuarioService } from "../../services/tipoUsuario/createTipoUsuario";

class CreateTipoUsuarioController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { nome_tipousuario } = request.body as { nome_tipousuario: string };

        const createTipoUsuario = new createTipoUsuarioService()
        const TipoUsuario = await createTipoUsuario.execute({ nome_tipousuario });

        reply.send(TipoUsuario);
    }
}

export { CreateTipoUsuarioController };