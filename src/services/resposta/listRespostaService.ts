import prismaClient from "../../prisma";

class listRespostaService {
  async execute() {
    const respostas = await prismaClient.resposta.findMany({
      orderBy: { dataCriacao_resposta: "desc" },
      include: {
        usuario: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
        pergunta: {
          select: {
            id_pergunta: true,
            pergunta: true,
            usuario: {
              select: {
                id_usuario: true,
                nome_usuario: true,
                apelido_usuario: true,
              },
            },
          },
        },
      },
    });

    return respostas;
  }
}

export { listRespostaService };