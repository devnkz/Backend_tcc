import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../../services/users/createUserService";

interface CreateUserBody {
  nome_usuario: string;
  apelido_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  fkIdTipoUsuario: string;
}

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nome_usuario, apelido_usuario, email_usuario, senha_usuario, fkIdTipoUsuario } = request.body as CreateUserBody;

    const createUser = new CreateUserService();

    try {
      const user = await createUser.execute({
        nome_usuario,
        apelido_usuario,
        email_usuario,
        senha_usuario,
        fkIdTipoUsuario
      });

      return reply.send(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return reply.status(500).send({ error: "Erro interno ao criar usuário." });
    }
  }
}

export { CreateUserController };
