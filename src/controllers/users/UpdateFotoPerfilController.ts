import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateFotoPerfilService } from "../../services/users/updateFotoPerfilService";

export class UpdateFotoPerfilController {
  async handle(request: any, reply: FastifyReply) {
    const { id } = request.params;

    if (!request.file) {
      return reply.status(400).send({ error: "Nenhum arquivo enviado" });
    }

    const foto_perfil = `backendtcc-production-7c03.up.railway.app/uploads/${request.file.filename}`;

    const service = new UpdateFotoPerfilService();
    const user = await service.execute({ id, foto_perfil });

    return reply.send(user);
  }
}
