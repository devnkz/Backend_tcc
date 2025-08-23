import prismaClient from "../../prisma";

class ListGruposDoUsuarioService {
  async execute(userId: string) {
    const grupos = await prismaClient.grupo.findMany({
      where: {
        membros: {
          some: { userId },
        },
      },
      include: {
        membros: { include: { user: true } },
      },
    });

    return grupos;
  }
}

export { ListGruposDoUsuarioService };
