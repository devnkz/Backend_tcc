import prismaClient from "../../prisma";

class ListTipoUsuarioService {
    async execute() {
        const TipoUsuarios = await prismaClient.tipousuario.findMany({
            include: {
                usuarios: {
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