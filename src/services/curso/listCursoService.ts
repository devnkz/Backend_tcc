import prismaClient from "../../prisma";

class listCursoService {
  async execute() {
    const cursos = await prismaClient.curso.findMany();

    return cursos;
  }
}

export { listCursoService }; 