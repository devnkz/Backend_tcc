import prismaClient from "../../prisma";

class ListTipoUsuarioService {
    async execute() {
        const TipoUsuarios = await prismaClient.tipoUsuario.findMany();
        return TipoUsuarios;
    }
}

export { ListTipoUsuarioService };