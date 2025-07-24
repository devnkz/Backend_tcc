import prismaClient from "../../prisma";

interface CreatePerguntaProps {
    fkIdUsuario: string,
    pergunta: string,
    fkIdComponent: string
}

class createPerguntaService {
    async execute({ fkIdUsuario, pergunta, fkIdComponent }: CreatePerguntaProps) {
        if (!fkIdUsuario || !pergunta || !fkIdComponent) {
            throw new Error("Informacoes faltando");
        }

        const Pergunta = await prismaClient.pergunta.create({
            data: {
                fkIdUsuario,
                pergunta,
                fkIdComponent
            }
        })

        return Pergunta
    }
}

export { createPerguntaService };