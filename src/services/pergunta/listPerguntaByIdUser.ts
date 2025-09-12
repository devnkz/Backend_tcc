import prismaClient from "../../prisma";

class ListPerguntaByIdUserService {
  async execute(userId: string) {
    const perguntas = await prismaClient.pergunta.findMany({
      where: {
        userId: userId, // filtra pelo usuário
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {id:true,  name: true, apelido: true },
        },
        componente: {
          select: { nome: true },
        },
      },
    });

    return perguntas.map(p => ({
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
  }
}

export { ListPerguntaByIdUserService };
