import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserService } from "../../services/users/loginUserService";

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email_usuario, senha_usuario } = request.body as { email_usuario: string, senha_usuario: string }

        try {
            const loginUser = new LoginUserService;
            const user = await loginUser.execute({ email_usuario, senha_usuario })
            return reply.send(user)
        } catch (error: any) {
            // map known service errors to appropriate HTTP status codes
            const msg = String(error?.message || "").toLowerCase();
            if (msg.includes("não encontrado") || msg.includes("não existe") || msg.includes("usuário não encontrado")) {
                return reply.status(404).send({ message: "Email não cadastrado" });
            }
            if (msg.includes("senha incorreta") || msg.includes("senha")) {
                return reply.status(401).send({ message: "Credenciais inválidas" });
            }

            console.error("LoginUserController error:", error);
            return reply.status(500).send({ message: "Internal server error" });
        }
    }
}

export { LoginUserController }