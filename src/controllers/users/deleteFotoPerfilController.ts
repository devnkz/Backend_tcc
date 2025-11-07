import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteFotoPerfilService } from "../../services/users/deleteFotoPerfilService";

export class DeleteFotoPerfilController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = (request.params as any) || {};
    if (!id) {
      return reply.status(400).send({ error: "ID do usuário não informado" });
    }

    const service = new DeleteFotoPerfilService();
    const user = await service.execute({ id });
    return reply.send(user);
  }
}
