import  prisma  from "../../prisma";

class ListConquistasService {
  async execute() {
    return prisma.conquista.findMany({
      orderBy: {
        titulo: "asc"
      }
    });
  }
}

export { ListConquistasService };
