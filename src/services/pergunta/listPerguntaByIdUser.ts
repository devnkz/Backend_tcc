import prismaClient from "../../prisma";

class ListPerguntaByIdUserService {
  async execute(userId: string) {
    const perguntas = await prismaClient.pergunta.findMany({
      where: {
        fkIdUsuario: userId, // filtra pelo usuário
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, apelido: true },
        },
        componente: {
          select: { nomeComponente: true },
        },
      },
    });

    return perguntas.map(p => ({
      id: p.id,
      pergunta: p.pergunta,
      usuario: {
        name: p.user.name,
        apelido: p.user.apelido,
      },
      materia: p.componente.nomeComponente,
      criadaEm: p.createdAt,
    }));
  }
}

export { ListPerguntaByIdUserService };
