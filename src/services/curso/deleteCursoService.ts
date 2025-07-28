import prismaClient from "../../prisma";

interface DeleteCursoProps {
  id: string;
}

class deleteCursoService {
  async execute({ id }: DeleteCursoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.curso.delete({
      where: {
        id: id,
      },
    });
  }
}

export { deleteCursoService }; 