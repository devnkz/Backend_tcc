import prismaClient from "../../prisma";

class listRespostaService {
  async execute() {
    const respostas = await prismaClient.resposta.findMany({
      include: {
        pergunta: {
          select: {user: {select: {id: true}}}
        }
      }
    });

    return respostas;
  }
}

export { listRespostaService };