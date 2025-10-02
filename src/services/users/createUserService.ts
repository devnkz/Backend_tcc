import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

interface CreateUserProps {
  nome_usuario: string;
  apelido_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  fkIdTipoUsuario: string;
}

class CreateUserService {
  async execute({
    nome_usuario,
    apelido_usuario,
    email_usuario,
    senha_usuario,
    fkIdTipoUsuario = "7bd9763d-e2ba-42c5-a3a4-09de72f2feb0",
  }: CreateUserProps) {
    if (!nome_usuario || !apelido_usuario || !email_usuario || !senha_usuario  || !fkIdTipoUsuario) {
      throw new Error("Informações faltando");
    }

    // Criptografar a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha_usuario, saltRounds);

    // Criar usuário
    const user = await prismaClient.usuarios.create({
      data: {
        nome_usuario,
        apelido_usuario,
        email_usuario,
        senha_usuario: hashedPassword,
        fkIdTipoUsuario,
      },
      include: {
        tipoUsuario: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
