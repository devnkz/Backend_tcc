import prismaClient from "../../prisma";

interface UpdatePerguntaProps {
    id: string;
    userId: string;
    conteudo: string;
    fkIdComponente?: string;
}

class UpdatePerguntaService {
    async execute({ id, userId, conteudo, fkIdComponente }: UpdatePerguntaProps) {
        // Buscar usuário pelo ID
        const findPergunta = await prismaClient.pergunta.findUnique({
            where: { id }
        });

        if (!findPergunta) {
            throw new Error("Usuário não encontrado");
        }

        // Atualizar usuário e retornar os dados modificados
        const updatedPergunta = await prismaClient.pergunta.update({
            where: { id },
            data: { userId, conteudo, fkIdComponente: fkIdComponente ?? findPergunta.fkIdComponente }
        });

        return updatedPergunta;
    }
}

export { UpdatePerguntaService };