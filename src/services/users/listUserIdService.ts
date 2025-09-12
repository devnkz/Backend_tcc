import prismaClient from "../../prisma";

interface ListUserId {
  id?: string;
}

class ListUserIdService {
  async execute({ id }: ListUserId) {
    if (id) {
      const users = await prismaClient.user.findMany({
        where: { id },
        include: {
          curso: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
      return users;
    } else {
      const users = await prismaClient.user.findMany({
        include: {
          curso: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
      return users;
    }
  }
}

export { ListUserIdService };
