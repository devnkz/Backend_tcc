import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from "../services/deleteUserService";

class DeleteUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }

        const deleteUser = new DeleteUserService;
        const user = await deleteUser.execute({ id })

        reply.send(user)
    }
}

export { DeleteUserController }