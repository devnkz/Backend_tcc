import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserService } from "../../services/users/loginUserService";

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, senha } = request.body as { email: string, senha: string }

        const loginUser = new LoginUserService;
        const user = await loginUser.execute({ email, senha })

        reply.send(user)
    }
}

export { LoginUserController }