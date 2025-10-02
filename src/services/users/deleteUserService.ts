
import prismaClient from "../../prisma"

interface DeleteUserProps {
    id: string
}

class DeleteUserService {
    async execute({ id }: DeleteUserProps) {
        if (!id) {
            throw new Error("Id nao foi enviado")
        }

        const findUser = await prismaClient.usuarios.findFirst({
            where: {
                id_usuario: id
            }
        })

        if (!findUser) {
            throw new Error("Usuario nao existe");
        }

        await prismaClient.usuarios.delete({
            where: {
                id_usuario: findUser.id_usuario
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeleteUserService }