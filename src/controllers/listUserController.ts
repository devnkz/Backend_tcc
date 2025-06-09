import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../services/listUserService";

class ListUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listUser = new ListUserService();
        const user = await listUser.execute()

        reply.send(user)
    }
}

export { ListUserController }