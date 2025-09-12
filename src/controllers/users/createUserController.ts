import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../../services/users/createUserService";

interface CreateUserBody {
  name: string;
  apelido: string;
  email: string;
  senha: string;
  fkIdCurso: string;         // obrigatório
  fkIdTipoUsuario: string;   // também obrigatório (ajustei)
}

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, apelido, email, senha, fkIdCurso, fkIdTipoUsuario } = request.body as CreateUserBody;

    const createUser = new CreateUserService();

    try {
      const user = await createUser.execute({
        name,
        apelido,
        email,
        senha,
        fkIdCurso,
        fkIdTipoUsuario,
      });

      return reply.send(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return reply.status(500).send({ error: "Erro interno ao criar usuário." });
    }
  }
}

export { CreateUserController };
