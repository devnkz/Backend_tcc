import prismaClient from "../../prisma";

interface DeleteGrupoProps {
  id: string;
}

class deleteGrupoService {
  async execute({ id }: DeleteGrupoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.grupo.delete({
      where: {
        id: id,
      },
    });
  }
}

export { deleteGrupoService }; 