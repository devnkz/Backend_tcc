import prismaClient from "../../prisma";

class ListUserService {
    async execute() { 
        const users = await prismaClient.usuarios.findMany({
            include: {
                tipoUsuario: {
                    select: {
                        id_tipousuario: true,
                        nome_tipousuario: true,
                    },
                },
            },
        })
        return users;
    }
}

export { ListUserService };
