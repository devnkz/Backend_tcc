import prismaClient from "../../prisma";

class ListPerguntaService {
  async execute() {
    const perguntas = await prismaClient.pergunta.findMany({
      orderBy: { createdAt : "desc" },
      include: {
        user: {
          select: { id: true, name: true, apelido: true },
        },
        componente: {
          select: { nome: true },
        },
      },
    });

    const perguntasFormatadas = perguntas.map(p => ({
    id: p.id,
    pergunta: p.conteudo,
    usuario: {
      id: p.user.id,
      name: p.user.name,
      apelido: p.user.apelido,
    },
    materia: p.componente.nome,
    criadaEm: p.createdAt,
}));

    return perguntasFormatadas;
  }
}

export { ListPerguntaService };
