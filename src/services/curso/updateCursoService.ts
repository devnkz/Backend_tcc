import prismaClient from "../../prisma";

interface UpdateCursoProps {
  id: string;
  nomeCurso?: string;
}

class updateCursoService {
  async execute({ id, nomeCurso }: UpdateCursoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const curso = await prismaClient.curso.update({
      where: {
        id: id,
      },
      data: {
        nomeCurso,
      },
    });

    return curso;
  }
}

export { updateCursoService }; 