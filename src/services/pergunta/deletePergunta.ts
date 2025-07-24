import prismaClient from "../../prisma"

interface DeletePerguntaProps {
    id: string
}

class DeletePerguntaService {
    async execute({ id }: DeletePerguntaProps ) {
        if (!id) {
            throw new Error("Id nao foi enviado")
        }

        const findUser = await prismaClient.pergunta.findFirst({
            where: {
                id: id
            }
        })

        if (!findUser) {
            throw new Error("Cliente nao existe");
        }

        await prismaClient.pergunta.delete({
            where: {
                id: findUser.id
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeletePerguntaService }