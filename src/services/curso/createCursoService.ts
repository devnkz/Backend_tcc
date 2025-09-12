import prismaClient from "../../prisma";

interface CreateCursoProps {
  nome: string;
}

class createCursoService {
  async execute({ nome }: CreateCursoProps) {
    if (!nome) {
      throw new Error("Nome do curso é obrigatório");
    }

    const curso = await prismaClient.curso.create({
      data: {
        nome,
      },
    });

    return curso;
  }
}

export { createCursoService }; 