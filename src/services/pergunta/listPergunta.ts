import prismaClient from "../../prisma";

class ListPerguntaService {
  async execute() {
    const perguntas = await prismaClient.pergunta.findMany({
      orderBy: { dataCriacao_pergunta : "desc" },
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
            nome_componente: true 
          },
        },
        curso: {
          select: {
            nome_curso: true,
          }
        },
      },
    });

    return perguntas;
  }
}

export { ListPerguntaService };
