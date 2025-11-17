import prismaClient from "../../prisma";

class ListPerguntaByIdUserService {
  async execute(userId: string) {
    const perguntas = await prismaClient.pergunta.findMany({
      where: {
        fkId_usuario: userId, // filtra pelo usuário
      },
      orderBy: { dataCriacao_pergunta: "desc" },
      include: {
        usuarios: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
        componente: {
          select: { 
            id_componente: true,
            nome_componente: true 
          },
        },
      },
    });

    return perguntas;
  }
}

export { ListPerguntaByIdUserService };
