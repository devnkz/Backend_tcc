import prismaClient from "../../prisma";

class ListGruposByIdService {
  async execute(grupoId: string) {
    const grupo = await prismaClient.grupo.findUnique({
      where: { id_grupo: grupoId },
      include: {
        usuarios: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
        membro: {
          include: {
            usuarios: {
              select: {
                id_usuario: true,
                nome_usuario: true,
                apelido_usuario: true,
                foto_perfil: true,
              },
            },
          },
        },
      }
    });

    return grupo;
  }
}

export { ListGruposByIdService };
