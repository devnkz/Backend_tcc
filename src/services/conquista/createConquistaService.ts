import prismaClient from "../../prisma";

interface CreateConquistaInput {
  titulo: string;
  descricao: string;
  progressoMax: number;
}

class CreateConquistaService {
  async execute({ titulo, descricao, progressoMax }: CreateConquistaInput) {
    const conquista = await prismaClient.conquista.create({
      data: {
        titulo,
        descricao,
        progressoMax,
      },
    });

    return conquista;
  }
}

export { CreateConquistaService };
