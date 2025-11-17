import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../../prisma";

interface LoginUserProps {
  email_usuario: string;
  senha_usuario: string;
}

class LoginUserService {
  async execute({ email_usuario, senha_usuario }: LoginUserProps) {
    // Buscar o usuário pelo email
    const findUser = await prismaClient.usuarios.findFirst({
      where: {
        email_usuario: email_usuario
      },
      include: {
        tipousuario: true
      }
    });

    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar se a senha fornecida bate com a senha criptografada
    const isPasswordValid = await bcrypt.compare(senha_usuario, findUser.senha_usuario);

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id: findUser.id_usuario,
        nome_usuario: findUser.nome_usuario,
        apelido_usuario: findUser.apelido_usuario,
        email_usuario: findUser.email_usuario,
        tipo_usuario: findUser.tipousuario?.nome_tipousuario
      },
      process.env.JWT_SECRET || "meuSegredo123@!",
      { expiresIn: "48h" }
    );

    return { user: findUser, token };
  }
}

export { LoginUserService };
