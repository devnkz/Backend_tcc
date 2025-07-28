import prismaClient from "../../prisma";

interface DeleteRespostaProps {
  id: string;
}

class deleteRespostaService {
  async execute({ id }: DeleteRespostaProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.resposta.delete({
      where: {
        id: id,
      },
    });
  }
}

export { deleteRespostaService }; 