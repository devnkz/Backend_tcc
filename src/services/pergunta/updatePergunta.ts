import prismaClient from "../../prisma";

interface UpdatePerguntaProps {
    id: string;
    fkIdUsuario: string;
    pergunta: string;
    fkIdComponent: string;
}

class UpdatePerguntaService {
    async execute({ id, fkIdUsuario, pergunta, fkIdComponent }: UpdatePerguntaProps) {
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
            data: { fkIdUsuario, pergunta, fkIdComponent }
        });

        return updatedPergunta;
    }
}

export { UpdatePerguntaService };