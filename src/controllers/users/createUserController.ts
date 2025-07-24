import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService } from "../../services/users/createUserService";

class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, apelido, email, senha } = request.body as { name: string, apelido: string, email: string, senha: string }

        const createUser = new createUserService()
        const user = await createUser.execute({ name, apelido, email, senha });

        reply.send(user);
    }
}

export { CreateUserController };
