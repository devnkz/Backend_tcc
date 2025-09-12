import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

interface CreateUserProps {
  name: string;
  apelido: string;
  email: string;
  senha: string;
  fkIdCurso: string;        // obrigatório
  fkIdTipoUsuario: string;  // obrigatório
}

class CreateUserService {
  async execute({
    name,
    apelido,
    email,
    senha,
    fkIdCurso,
    fkIdTipoUsuario = "7bd9763d-e2ba-42c5-a3a4-09de72f2feb0",
  }: CreateUserProps) {
    if (!name || !apelido || !email || !senha || !fkIdCurso || !fkIdTipoUsuario) {
      throw new Error("Informações faltando");
    }

    // Criptografar a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Criar usuário
    const user = await prismaClient.user.create({
      data: {
        name,
        apelido,
        email,
        senha: hashedPassword,
        fkIdCurso,
        fkIdTipoUsuario,
      },
      include: {
        curso: true,
        tipoUsuario: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
