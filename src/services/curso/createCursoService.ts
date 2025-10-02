import prismaClient from "../../prisma";

interface CreateCursoProps {
  nome_curso: string;
}

class createCursoService {
  async execute({ nome_curso }: CreateCursoProps) {
    if (!nome_curso) {
      throw new Error("Nome do curso é obrigatório");
    }

    const curso = await prismaClient.curso.create({
      data: {
        nome_curso,
      },
    });

    return curso;
  }
}

export { createCursoService }; 