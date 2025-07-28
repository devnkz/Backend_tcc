import prismaClient from "../../prisma";

interface DeleteArtigoProps {
  id: string;
}

class deleteArtigoService {
  async execute({ id }: DeleteArtigoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.artigo.delete({
      where: {
        id: id,
      },
    });
  }
}

export { deleteArtigoService }; 