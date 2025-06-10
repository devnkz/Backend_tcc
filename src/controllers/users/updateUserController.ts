import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../../services/users/updateUserService";

class UpdateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const { name, email } = request.body as { name: string; email: string };

        const updateUser = new UpdateUserService();
        const updatedUser = await updateUser.execute({ id, name, email });

        reply.send(updatedUser);
    }
}

export { UpdateUserController };
