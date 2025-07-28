import prismaClient from "../../prisma";

interface DeleteComentarioProps {
  id: string;
}

class deleteComentarioService {
  async execute({ id }: DeleteComentarioProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.comentario.delete({
      where: {
        id: id,
      },
    });
  }
}

export { deleteComentarioService }; 