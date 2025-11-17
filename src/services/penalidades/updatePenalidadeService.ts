import prismaClient from "../../prisma";

interface UpdatePenalidadeProps {
    id: string;
    fkId_usuario: string;
    fkId_denuncia: string;
    banimento?: string;
    perder_credibilidade: number;
    descricao: string;
    ativa: boolean;
}

class UpdatePenalidadeService {
    async execute({ id, fkId_usuario, fkId_denuncia, perder_credibilidade, descricao, ativa }: UpdatePenalidadeProps) {
        // Buscar penalidade pelo ID
        const findPenalidade = await prismaClient.penalidades.findUnique({
            where: { id_penalidade: id }
        });

        if (!findPenalidade) {
            throw new Error("Penalidade não encontrada");
        }

        // Verificar se o usuário existe
        const userExists = await prismaClient.usuarios.findUnique({
            where: { id_usuario: fkId_usuario }
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        // Verificar se a denúncia existe
        const denunciaExists = await prismaClient.denuncias.findUnique({
            where: { id_denuncia: fkId_denuncia }
        });

        if (!denunciaExists) {
            throw new Error("Denúncia não encontrada");
        }

        // Atualizar penalidade e retornar os dados modificados
        const updatedPenalidade = await prismaClient.penalidades.update({
            where: { id_penalidade: id },
            data: { 
                fkId_usuario, 
                fkId_denuncia, 
                perder_credibilidade, 
                descricao,
                ativa 
            },
            include: {
                usuarios: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                    }
                },
                denuncias: {
                    select: {
                        id_denuncia: true,
                        nivel_denuncia: true,
                        status: true,
                        resultado: true,
                    }
                }
            }
        });

        return updatedPenalidade;
    }
}

export { UpdatePenalidadeService };
