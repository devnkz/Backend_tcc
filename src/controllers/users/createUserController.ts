import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../../services/users/createUserService";

interface CreateUserBody {
  nome_usuario: string;
  apelido_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  fkIdTipoUsuario?: string;
  credibilidade_usuario?: number;
}

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      nome_usuario,
      apelido_usuario,
      email_usuario,
      senha_usuario,
      fkIdTipoUsuario,
      credibilidade_usuario,
    } = request.body as CreateUserBody;

    const createUser = new CreateUserService();

    try {
      const user = await createUser.execute({
        nome_usuario,
        apelido_usuario,
        email_usuario,
        senha_usuario,
        fkIdTipoUsuario,
        credibilidade_usuario,
      });

      return reply.status(201).send(user);

    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);

      const status = error.status || 400;
      const message = error.message || "Erro interno ao criar usuário.";

      // Return a consistent `message` field so clients can reliably read the error
      return reply.status(status).send({ message });
    }
  }
}

export { CreateUserController };
