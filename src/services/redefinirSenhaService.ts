import crypto from "crypto";
import prismaClient from "../prisma";
import { enviarTokenRedefinicao } from "../utils/mailer";

export class ForgotPasswordService {
  async execute(email_usuario: string) {
    // Buscar usuário pelo email
    const user = await prismaClient.usuarios.findUnique({
      where: { email_usuario }
    });

    if (!user) {
      const err: any = new Error("Usuário não encontrado.");
      err.status = 404;
      throw err;
    }

    // Gerar token seguro
    const token = crypto.randomBytes(32).toString("hex");

    // Criar registro do token
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await prismaClient.redefinirSenha.create({
      data: {
        email_usuario: user.email_usuario,
        token_redefinirsenha: token,
        dataExpiracao_redefinir: expiresAt
      }
    });

    await enviarTokenRedefinicao(user.email_usuario, token);

    return {
      message: "Token de redefinição gerado.",
      token,
      expiresAt,
    };
  }
}
