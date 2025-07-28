import { FastifyRequest, FastifyReply } from "fastify";
import { ListTipoUsuarioService } from "../../services/tipoUsuario/listTipoUsuario";

class ListTipoUsuarioController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listTipoUsuario = new ListTipoUsuarioService();
        const TipoUsuario = await listTipoUsuario.execute()

        reply.send(TipoUsuario)
    }
}

export { ListTipoUsuarioController }