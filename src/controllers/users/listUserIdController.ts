import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserIdService } from "../../services/users/listUserIdService";

interface ListUserId{
    id: string
}

class ListUserIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as ListUserId

        const listUser = new ListUserIdService();
        const user = await listUser.execute({ id })

        reply.send(user)
    }
}

export { ListUserIdController }