import prismaClient from "../../prisma";

class ListGruposDoUsuarioService {
  async execute(userId: string) {
    const grupos = await prismaClient.grupo.findMany({
      where: {
        membros: {
          some: { fkId_usuario: userId },
        },
      },
      include: {
        membros: {
          include: { 
            usuario: {
              select: {
                id_usuario: true,
                nome_usuario: true,
                apelido_usuario: true,
                foto_perfil: true
              }
            }
          },
        },
        usuario: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
      },
    });

    return grupos;
  }
}

export { ListGruposDoUsuarioService };
