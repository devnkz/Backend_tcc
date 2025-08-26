import prismaClient from "../../prisma";

class ListPerguntaService {
  async execute() {
    const perguntas = await prismaClient.pergunta.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, apelido: true },
        },
        componente: {
          select: { nomeComponente: true },
        },
      },
    });

    const perguntasFormatadas = perguntas.map(p => ({
    id: p.id,
    pergunta: p.pergunta,
    usuario: {
      id: p.user.id,
      name: p.user.name,
      apelido: p.user.apelido
    },
    materia: p.componente.nomeComponente,
    criadaEm: p.createdAt,
}));

    return perguntasFormatadas;
  }
}

export { ListPerguntaService };
