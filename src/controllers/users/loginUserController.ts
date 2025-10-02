import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserService } from "../../services/users/loginUserService";

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email_usuario, senha_usuario } = request.body as { email_usuario: string, senha_usuario: string }

        const loginUser = new LoginUserService;
        const user = await loginUser.execute({ email_usuario, senha_usuario })

        reply.send(user)
    }
}

export { LoginUserController }