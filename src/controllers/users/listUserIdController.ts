import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserIdService } from "../../services/users/listUserIdService";

interface ListUserId{
    id: string
}

class ListUserIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as ListUserId

        // Defensive: reject missing or malformed ids (expect UUID)
        if (!id || id === "undefined" || id === "null") {
            return reply.code(400).send({ message: "id inválido: ausente" });
        }

        // Validação de formato UUID (Prisma usa uuid())
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return reply.code(400).send({ message: "id inválido: formato UUID esperado" });
        }

        const listUser = new ListUserIdService();
        const user = await listUser.execute({ id })

        return reply.code(200).send(user)
    }
}

export { ListUserIdController }