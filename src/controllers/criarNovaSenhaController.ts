import type { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../prisma";
import bcrypt from "bcrypt";

export async function redefinirSenhaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { token, novaSenha } = request.body as {
      token: string;
      novaSenha: string;
    };

    if (!token || !novaSenha) {
      return reply
        .status(400)
        .send({ erro: "Token e nova senha são obrigatórios." });
    }

    // ✔ TOKEN NÃO É UNIQUE → findFirst()
    const registro = await prisma.redefinirSenha.findFirst({
      where: { token_redefinirsenha: token },
    });

    if (!registro) {
      return reply.status(400).send({ erro: "Token inválido." });
    }

    if (registro.dataExpiracao_redefinir < new Date()) {
      return reply.status(400).send({ erro: "Token expirado." });
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.usuarios.update({
      where: { email_usuario: registro.email_usuario },
      data: { senha_usuario: senhaHash },
    });

    // ✔ DELETAR USANDO O ID (único)
    await prisma.redefinirSenha.delete({
      where: { id_redefinirsenha: registro.id_redefinirsenha },
    });

    return reply.status(200).send({ sucesso: true });

  } catch (err) {
    console.error("Erro ao redefinir senha:", err);
    return reply.status(500).send({ erro: "Erro interno ao redefinir senha." });
  }
}
