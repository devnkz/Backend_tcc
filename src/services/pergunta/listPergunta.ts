import prismaClient from "../../prisma";

class ListPerguntaService {
  async execute() {
    const perguntas = await prismaClient.pergunta.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true },
        },
        componente: {
          select: { nomeComponente: true },
        },
      },
    });

    const perguntasFormatadas = perguntas.map(p => ({
      id: p.id,
      pergunta: p.pergunta,
      usuario: p.user.name,
      materia: p.componente.nomeComponente,
      criadaEm: p.createdAt,
    }));

    return perguntasFormatadas;
  }
}

export { ListPerguntaService };
