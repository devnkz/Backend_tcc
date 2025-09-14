import prismaClient from "../../prisma";

class ListGruposByIdService {
  async execute(grupoId: string) {
    const grupo = await prismaClient.grupo.findUnique({
      where: { id: grupoId },
      include: {
        createdBy: { select: { name: true} },
        membros: {
          include: { user: true }
        }
      }
    });

    return grupo;
  }
}

export { ListGruposByIdService };
