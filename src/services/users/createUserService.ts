import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

interface CreateUserProps {
  name: string;
  apelido: string;
  email: string;
  senha: string;
  fkIdTipoUsuario?: string; 
}

class createUserService {
  async execute({
    name,
    apelido,
    email,
    senha,
    fkIdTipoUsuario = "d419bc88-a455-40a4-884c-e79269125351"
  }: CreateUserProps) {

    if (!name || !apelido || !email || !senha) {
      throw new Error("Informacoes faltando");
    }

    // Criptografar a senha
    const saltRounds = 10; // número de rounds de hash, padrão seguro
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const user = await prismaClient.user.create({
      data: {
        name,
        apelido,
        email,
        senha: hashedPassword, // salvar a senha criptografada
        fkIdTipoUsuario,
      },
    });

    return user;
  }
}

export { createUserService };
