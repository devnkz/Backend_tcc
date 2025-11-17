import prismaClient from "../../prisma";

class ListGruposDoUsuarioService {
  async execute(userId: string) {
    const grupos = await prismaClient.grupo.findMany({
      where: {
        membro: {
          some: { fkId_usuario: userId },
        },
      },
      include: {
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
        usuarios: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
        _count: {
          select: {
            mensagem: true
          }
        }
      },
    });

    return grupos;
  }
}

export { ListGruposDoUsuarioService };
