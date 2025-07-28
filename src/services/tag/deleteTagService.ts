import prismaClient from "../../prisma";

interface DeleteTagProps {
  id: string;
}

class deleteTagService {
  async execute({ id }: DeleteTagProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.tag.delete({
      where: {
        id: id,
      },
    });
  }
}

export { deleteTagService }; 