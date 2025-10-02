import prismaClient from "../../prisma";

class listCursoService {
  async execute() {
    const cursos = await prismaClient.curso.findMany({
      include: {
        componentes: {
          select: {
            id_componente: true,
            nome_componente: true,
          },
        },
      },
    });

    return cursos;
  }
}

export { listCursoService }; 