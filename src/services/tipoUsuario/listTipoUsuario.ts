import prismaClient from "../../prisma";

class ListTipoUsuarioService {
    async execute() {
        const TipoUsuarios = await prismaClient.tipoUsuario.findMany({
            include: {
                users: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                    },
                },
            },
        });
        return TipoUsuarios;
    }
}

export { ListTipoUsuarioService };