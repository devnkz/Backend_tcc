import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../../prisma";

interface LoginUserProps {
  email: string;
  senha: string;
}

class LoginUserService {
  async execute({ email, senha }: LoginUserProps) {
    // Buscar o usuário pelo email
    const findUser = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar se a senha fornecida bate com a senha criptografada
    const isPasswordValid = await bcrypt.compare(senha, findUser.senha);

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id: findUser.id,
        name: findUser.name,
        apelido: findUser.apelido,
        email: findUser.email
      },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "48h" }
    );

    return { user: findUser, token };
  }
}

export { LoginUserService };
