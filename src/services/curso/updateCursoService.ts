import prismaClient from "../../prisma";

interface UpdateCursoProps {
  id: string;
  nome_curso?: string;
}

class updateCursoService {
  async execute({ id, nome_curso }: UpdateCursoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const curso = await prismaClient.curso.update({
      where: {
        id_curso: id,
      },
      data: {
        nome_curso,
      },
    });

    return curso;
  }
}

export { updateCursoService }; 