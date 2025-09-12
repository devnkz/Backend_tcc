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
        membros: {
          include: { user: true },
        },
        componente: {
          select: {
            nome: true,
          },
        },
      },
    });

    return grupos;
  }
}

export { ListGruposDoUsuarioService };
