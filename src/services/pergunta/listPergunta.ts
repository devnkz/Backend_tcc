import prismaClient from "../../prisma";

class ListPeguntaService {
    async execute() {
        const perguntas = await prismaClient.pergunta.findMany();
        return perguntas;
    }
}

export { ListPeguntaService };