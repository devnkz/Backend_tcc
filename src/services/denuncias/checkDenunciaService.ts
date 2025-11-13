import prismaClient from "../../prisma";

interface CheckDenunciaRequest {
    id_usuario: string;
    id_conteudo: string;
    tipo_conteudo: string;
}

class CheckDenunciaService {
    async execute({ id_usuario, id_conteudo, tipo_conteudo }: CheckDenunciaRequest) {
        const existingDenuncia = await prismaClient.denuncias.findFirst({
            where: {
                fkId_usuario: id_usuario,
                fkId_conteudo_denunciado: id_conteudo,
                tipo_conteudo: tipo_conteudo,
            },
            select: {
                id_denuncia: true,
                resultado: true,
            }
        });

        return {
            exists: !!existingDenuncia,
            denuncia: existingDenuncia,
        };
    }
}

export { CheckDenunciaService };
