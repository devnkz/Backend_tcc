import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService } from "../../services/users/createUserService";

interface CreateUserBody {
  name: string;
  apelido: string;
  email: string;
  senha: string;
  fkIdTipoUsuario?: string;
}

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, apelido, email, senha, fkIdTipoUsuario } = request.body as CreateUserBody;

    const createUser = new createUserService();

    try {
      const user = await createUser.execute({ name, apelido, email, senha, fkIdTipoUsuario });
      return reply.send(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return reply.status(500).send({ error: "Erro interno ao criar usuário." });
    }
  }
}

export { CreateUserController };

