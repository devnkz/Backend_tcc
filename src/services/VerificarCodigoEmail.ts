import jwt from "jsonwebtoken";
import prismaClient from "../prisma";

interface VerifyCodeInput {
  codigo: string;
  email_usuario: string;
}

class VerifyCodeService {
  async execute({ codigo, email_usuario }: VerifyCodeInput) {

    const record = await prismaClient.codigoVerificacaoEmail.findFirst({
      orderBy: {
        dataCriacao_codigo: "desc",
      },
      where: {
        codigo: codigo,
        email_usuario: email_usuario,
      },
    });

    if (!record) {
      const err: any = new Error("Código inválido ou expirado.");
      err.status = 401;
      throw err;
    }

    // Verificar expiração
    const now = new Date();
    if (record.dataExpiracao_codigo && record.dataExpiracao_codigo < now) {
      const err: any = new Error("Código expirado.");
      err.status = 400;
      throw err;
    }

    const user = await prismaClient.usuarios.findFirst({
      where: { email_usuario: record.email_usuario },
      include: {
        tipousuario: true,
      },
    });

    if (!user) {
      const err: any = new Error("Usuário não encontrado.");
      err.status = 404;
      throw err;
    }

    await prismaClient.codigoVerificacaoEmail.delete({
      where: { id_codigoverificacaoemail: record.id_codigoverificacaoemail },
    });

    const token = jwt.sign(
      {
        id: user.id_usuario,
        nome_usuario: user.nome_usuario,
        apelido_usuario: user.apelido_usuario,
        email_usuario: user.email_usuario,
        tipo_usuario: user.tipousuario.nome_tipousuario,
      },
      process.env.JWT_SECRET || "meuSegredo123@!",
      { expiresIn: "48h" }
    );

    console.log("TOKEN GERADO PARA:", user.email_usuario);

    return {
      message: "Código verificado com sucesso.",
      token,
      user,
    };
  }
}

export { VerifyCodeService };
