import prismaClient from "../../prisma";

interface UpdateDenunciaProps {
    id: string;
    fkId_usuario: string;
    fkId_conteudo_denunciado: string;
    nivel_denuncia: number;
    status: string;
    resultado: string;
}

class UpdateDenunciaService {
    async execute({ id, fkId_usuario, fkId_conteudo_denunciado, nivel_denuncia, status, resultado }: UpdateDenunciaProps) {
        // Buscar denúncia pelo ID
        const findDenuncia = await prismaClient.denuncias.findUnique({
            where: { id_denuncia: id }
        });

        if (!findDenuncia) {
            throw new Error("Denúncia não encontrada");
        }

        // Verificar se o usuário existe
        const userExists = await prismaClient.usuarios.findUnique({
            where: { id_usuario: fkId_usuario }
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        // Atualizar denúncia e retornar os dados modificados
        const updatedDenuncia = await prismaClient.denuncias.update({
            where: { id_denuncia: id },
            data: { 
                fkId_usuario, 
                fkId_conteudo_denunciado, 
                nivel_denuncia, 
                status,
                resultado 
            },
            include: {
                usuario: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                    }
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
            }
        });

        return updatedDenuncia;
    }
}

export { UpdateDenunciaService };
