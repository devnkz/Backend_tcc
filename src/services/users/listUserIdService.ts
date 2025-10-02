import prismaClient from "../../prisma";

interface ListUserId {
  id?: string;
}

class ListUserIdService {
  async execute({ id }: ListUserId) {
    if (id) {
      const users = await prismaClient.usuarios.findUnique({
        where: { id_usuario: id },
        include: {
          tipoUsuario: {
            select: {
              id_tipousuario: true,
              nome_tipousuario: true,
            },
          },
        },
      });
      return users;
    }
  }
}

export { ListUserIdService };
