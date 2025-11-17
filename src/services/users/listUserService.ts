import prismaClient from "../../prisma";

class ListUserService {
    async execute() { 
        const users = await prismaClient.usuarios.findMany({
            include: {
                    tipousuario: {
                        select: {
                            id_tipousuario: true,
                            nome_tipousuario: true,
                        },
                    },
                    penalidades: {
                        select: {
                            id_penalidade: true,
                            dataInicio_penalidade: true,
                            dataFim_penalidade: true,
                            perder_credibilidade: true,
                            descricao: true,
                            ativa: true,
                        },
                    },
                },
        })
        // Map `tipousuario` to `tipoUsuario` to match frontend expectations
        const normalized = users.map((u: any) => ({
            ...u,
            tipoUsuario: u.tipousuario ?? null,
        }));
        return normalized;
    }
}

export { ListUserService };
