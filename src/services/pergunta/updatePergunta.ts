import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";

interface UpdatePerguntaProps {
    id: string;
    userId: string;
    pergunta: string;
    fkId_componente?: string;
    fkId_curso?: string;
}

class UpdatePerguntaService {
    async execute({ id, userId, pergunta, fkId_componente, fkId_curso }: UpdatePerguntaProps) {
        // Buscar pergunta pelo ID
        const findPergunta = await prismaClient.pergunta.findUnique({
            where: { id_pergunta: id }
        });

        if (!findPergunta) {
            throw new Error("Pergunta não encontrada");
        }

        if(findPergunta.fkId_usuario !== userId){
            throw new Error("Você não tem permissão para atualizar esta pergunta");
        }

        const perguntaValidada = validarTextoOuErro(pergunta);

        // Atualizar pergunta e retornar os dados modificados
        const updatedPergunta = await prismaClient.pergunta.update({
            where: { id_pergunta: id },
            data: {
                pergunta: perguntaValidada.textoFiltrado,
                fkId_componente: fkId_componente && fkId_componente.trim() !== "" 
                ? fkId_componente 
                : findPergunta.fkId_componente,
                fkId_curso: fkId_curso && fkId_curso.trim() !== "" 
                ? fkId_curso 
                : findPergunta.fkId_curso,
            },
            include: {
                usuario: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                    },
                },
                componente: {
                    select: {
                        id_componente: true,
                        nome_componente: true,
                    },
                },
                curso: {
                    select: {
                        id_curso: true,
                        nome_curso: true
                    }
                },
            }
        });

        return updatedPergunta;
    }
}

export { UpdatePerguntaService };