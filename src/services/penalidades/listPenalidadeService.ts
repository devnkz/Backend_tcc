import prismaClient from "../../prisma";

class ListPenalidadeService {
    async execute() { 
        const penalidades = await prismaClient.penalidades.findMany({
            include: {
                usuario: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                    },
                },
                denuncia: {
                    select: {
                        id_denuncia: true,
                        nivel_denuncia: true,
                        fkId_conteudo_denunciado: true,
                        tipo_conteudo: true,
                        status: true,
                        resultado: true,
                    }
                },
            },
        })
        return penalidades;
    }
}

export { ListPenalidadeService };
