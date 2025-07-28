import prismaClient from "../../prisma";

interface CreateUserProps {
  name: string;
  apelido: string;
  email: string;
  senha: string;
  fkIdTipoUsuario?: string; 
}


class createUserService {
  async execute({name, apelido, email, senha, fkIdTipoUsuario = "d419bc88-a455-40a4-884c-e79269125351"} : CreateUserProps) {

    if (!name || !apelido || !email || !senha) {
      throw new Error("Informacoes faltando");
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        apelido,
        email,
        senha,
        fkIdTipoUsuario,
      },
    });

    return user;
  }
}


export { createUserService };