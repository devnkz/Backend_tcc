import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../../prisma";
import { enviarCodigo } from "../../utils/mailer";

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
        tipoUsuario: true
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

    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prismaClient.codigoVerificacaoEmail.create({
      data: {
        codigo: generatedCode,
        email_usuario: email_usuario,
        dataCriacao_codigo: new Date(),
        dataExpiracao_codigo: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    await enviarCodigo(email_usuario, generatedCode);

    return { user: findUser };
  }
}

export { LoginUserService };
