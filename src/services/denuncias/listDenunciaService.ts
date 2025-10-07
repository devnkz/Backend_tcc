import prismaClient from "../../prisma";

class ListDenunciaService {
    async execute() { 
        const denuncias = await prismaClient.denuncias.findMany({
            include: {
                usuario: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                    },
                },
                penalidade: {
                    select: {
                        id_penalidade: true,
                        banimento: true,
                        perder_credibilidade: true,
                        descricao: true,
                        ativa: true,
                    }
                }
            },
        })
        return denuncias;
    }
}

export { ListDenunciaService };
