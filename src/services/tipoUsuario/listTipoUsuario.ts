import prismaClient from "../../prisma";

class ListTipoUsuarioService {
    async execute() {
        const TipoUsuarios = await prismaClient.tipousuario.findMany();
        return TipoUsuarios;
    }
}

export { ListTipoUsuarioService };