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
                Penalidades:{
                    select: {
                        id_penalidade: true,
                        dataInicio_penalidade: true,
                        dataFim_penalidade: true,
                        perder_credibilidade: true,
                        descricao: true,
                        ativa: true,
                    }
                }
            },
        })
        return users;
    }
}

export { ListUserService };
