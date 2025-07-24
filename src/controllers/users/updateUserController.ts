import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../../services/users/updateUserService";

class UpdateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const { name, apelido, email, senha } = request.body as { name: string; apelido: string; email: string; senha: string };

        const updateUser = new UpdateUserService();
        const updatedUser = await updateUser.execute({ id, name, apelido, email, senha });

        reply.send(updatedUser);
    }
}

export { UpdateUserController };
