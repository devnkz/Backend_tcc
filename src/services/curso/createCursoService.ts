import prismaClient from "../../prisma";

interface CreateCursoProps {
  nomeCurso: string;
}

class createCursoService {
  async execute({ nomeCurso }: CreateCursoProps) {
    if (!nomeCurso) {
      throw new Error("Nome do curso é obrigatório");
    }

    const curso = await prismaClient.curso.create({
      data: {
        nomeCurso,
      },
    });

    return curso;
  }
}

export { createCursoService }; 