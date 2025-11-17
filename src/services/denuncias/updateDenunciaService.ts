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

        // Determine which user id to use for the updated record.
        // If the caller didn't provide `fkId_usuario` (e.g. archiving a denúncia)
        // fall back to the existing value on the record.
        const fkUserToUse = fkId_usuario ?? findDenuncia.fkId_usuario;

        // If we have a user id, verify the user exists. If not found, throw.
        if (fkUserToUse) {
            const userExists = await prismaClient.usuarios.findUnique({
                where: { id_usuario: fkUserToUse }
            });
            if (!userExists) {
                throw new Error("Usuário não encontrado");
            }
        }

        // Atualizar denúncia e retornar os dados modificados
        const updatedDenuncia = await prismaClient.denuncias.update({
            where: { id_denuncia: id },
            data: { 
                fkId_usuario: fkUserToUse, 
                fkId_conteudo_denunciado, 
                nivel_denuncia, 
                status,
                resultado 
            },
            include: {
                usuarios: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                    }
                },
                penalidades: {
                    select: {
                        id_penalidade: true,
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
