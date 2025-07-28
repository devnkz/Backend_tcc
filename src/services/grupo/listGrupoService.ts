import prismaClient from "../../prisma";

class listGrupoService {
  async execute() {
    const grupos = await prismaClient.grupo.findMany();

    return grupos;
  }
}

export { listGrupoService }; 