import prismaClient from "../../prisma";

interface UpdatePerguntaProps {
    id: string;
    userId: string;
    conteudo: string;
    fkIdComponente?: string;
}

class UpdatePerguntaService {
    async execute({ id, userId, conteudo, fkIdComponente }: UpdatePerguntaProps) {
        // Buscar pergunta pelo ID
        const findPergunta = await prismaClient.pergunta.findUnique({
            where: { id }
        });

        if (!findPergunta) {
            throw new Error("Usuário não encontrado");
        }

        if(findPergunta.userId !== userId){
            throw new Error("Você não tem permissão para atualizar esta pergunta");
        }

        // Atualizar pergunta e retornar os dados modificados
        const updatedPergunta = await prismaClient.pergunta.update({
            where: { id },
                data: {
                    conteudo,
                    fkIdComponente: fkIdComponente && fkIdComponente.trim() !== "" 
                    ? fkIdComponente 
                    : findPergunta.fkIdComponente
                }
});

        return updatedPergunta;
    }
}

export { UpdatePerguntaService };