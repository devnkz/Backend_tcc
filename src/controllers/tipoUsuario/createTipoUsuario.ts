import { FastifyRequest, FastifyReply } from "fastify";
import { createTipoUsuarioService } from "../../services/tipoUsuario/createTipoUsuario";

class CreateTipoUsuarioController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { nomeTipoUsuario } = request.body as { nomeTipoUsuario: string };

        const createTipoUsuario = new createTipoUsuarioService()
        const TipoUsuario = await createTipoUsuario.execute({ nomeTipoUsuario });

        reply.send(TipoUsuario);
    }
}

export { CreateTipoUsuarioController };