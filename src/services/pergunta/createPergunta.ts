import prismaClient from "../../prisma";

interface CreatePerguntaProps {
  userId: string;
  conteudo: string;
  fkIdComponente: string;
}

class CreatePerguntaService {
  async execute({ userId, conteudo, fkIdComponente }: CreatePerguntaProps) {
    if (!userId || !conteudo || !fkIdComponente) {
      throw new Error("Informações faltando");
    }

    const pergunta = await prismaClient.pergunta.create({
      data: {
        userId,
        conteudo,
        fkIdComponente,
      },
      include: {
        user: true,
        componente: true,
      },
    });

    return pergunta;
  }
}

export { CreatePerguntaService };
