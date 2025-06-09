import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService } from "../services/createUserService";

class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email } = request.body as { name: string, email: string }

        const createUser = new createUserService()
        const user = await createUser.execute({ name, email });

        reply.send(user);
    }
}

export { CreateUserController };
