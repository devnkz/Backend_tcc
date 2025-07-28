import prismaClient from "../../prisma";

class listRespostaService {
  async execute() {
    const respostas = await prismaClient.resposta.findMany();

    return respostas;
  }
}

export { listRespostaService }; 