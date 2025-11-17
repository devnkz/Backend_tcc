import prismaClient from "../../prisma";

class listGrupoService {
  async execute() {
    const grupos = await prismaClient.grupo.findMany({
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
              },
            },
          },
        },
      },
    });

    return grupos;
  }
}

export { listGrupoService }; 