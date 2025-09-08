import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateFotoPerfilService } from "../../services/users/UpdateFotoPerfilController ";

export class UpdateFotoPerfilController {
  async handle(request: any, reply: FastifyReply) {
    const { id } = request.params;

    if (!request.file) {
      return reply.status(400).send({ error: "Nenhum arquivo enviado" });
    }

    const url = `http://localhost:3333/uploads/${request.file.filename}`;

    const service = new UpdateFotoPerfilService();
    const user = await service.execute({ id, url });

    return reply.send(user);
  }
}
