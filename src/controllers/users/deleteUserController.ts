import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from "../../services/users/deleteUserService";

class DeleteUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }

        const deleteUser = new DeleteUserService;
        await deleteUser.execute({ id })
        return reply.status(204).send()
    }
}

export { DeleteUserController }