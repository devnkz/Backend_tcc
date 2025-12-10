import prismaClient from "../../prisma";

interface UpdateFotoPerguntaRequest {
  id: string;
  foto_pergunta: string;
}

export class UpdateFotoPerguntaService {
  async execute({ id, foto_pergunta }: UpdateFotoPerguntaRequest) {
    const user = await prismaClient.pergunta.update({
      where: { id_pergunta: id },
      data: {
        foto_pergunta: foto_pergunta,
      },
    });

    return user;
  }
}
