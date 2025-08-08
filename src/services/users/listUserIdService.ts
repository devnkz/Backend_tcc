import prismaClient from "../../prisma";

interface ListUserId {
    id: string;
}

class ListUserIdService {
    async execute({ id }: ListUserId) {
        if (id) {
            const users = await prismaClient.user.findMany({
                where: {
                    id: id,
                },
            });
            return users;
        } else {
            const users = await prismaClient.user.findMany();
            return users;
        }
    }
}

export { ListUserIdService };
