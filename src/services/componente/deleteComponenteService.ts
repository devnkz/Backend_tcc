import prismaClient from "../../prisma";

interface DeleteComponenteProps {
  id: string;
}

class deleteComponenteService {
  async execute({ id }: DeleteComponenteProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.componente.delete({
      where: {
        id_componente: id,
      },
    });
  }
}

export { deleteComponenteService }; 