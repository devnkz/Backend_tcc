import prismaClient from "../../prisma"

interface DeletePenalidadeProps {
    id: string
}

class DeletePenalidadeService {
    async execute({ id }: DeletePenalidadeProps) {
        if (!id) {
            throw new Error("Id nao foi enviado")
        }

        const findPenalidade = await prismaClient.penalidades.findFirst({
            where: {
                id_penalidade: id
            }
        })

        if (!findPenalidade) {
            throw new Error("Penalidade nao existe");
        }

        await prismaClient.penalidades.delete({
            where: {
                id_penalidade: findPenalidade.id_penalidade
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeletePenalidadeService }
