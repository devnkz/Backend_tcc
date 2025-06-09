
import prismaClient from "../prisma"

interface DeleteUserProps {
    id: string
}

class DeleteUserService {
    async execute({ id }: DeleteUserProps) {
        if (!id) {
            throw new Error("Id nao foi enviado")
        }

        const findUser = await prismaClient.user.findFirst({
            where: {
                id: id
            }
        })

        if (!findUser) {
            throw new Error("Cliente nao existe");
        }

        await prismaClient.user.delete({
            where: {
                id: findUser.id
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeleteUserService }