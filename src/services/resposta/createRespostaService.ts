import prismaClient from "../../prisma";

interface CreateRespostaProps {
  perguntaId: string;
  userId: string;
  conteudo: string;
}

class CreateRespostaService {
  async execute({ perguntaId, userId, conteudo }: CreateRespostaProps) {
    if (!perguntaId || !userId || !conteudo) {
      throw new Error("Informações faltando");
    }

    const resposta = await prismaClient.resposta.create({
      data: {
        perguntaId,
        userId,
        conteudo,
      },
      include: {
        user: true,        // opcional, traz dados do usuário
        pergunta: true,    // opcional, traz dados da pergunta
      },
    });

    return resposta;
  }
}

export { CreateRespostaService };
