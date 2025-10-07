import prismaClient from "../../prisma"

interface DeleteDenunciaProps {
    id: string
}

class DeleteDenunciaService {
    async execute({ id }: DeleteDenunciaProps) {
        if (!id) {
            throw new Error("Id nao foi enviado")
        }

        const findDenuncia = await prismaClient.denuncias.findFirst({
            where: {
                id_denuncia: id
            }
        })

        if (!findDenuncia) {
            throw new Error("Denuncia nao existe");
        }

        await prismaClient.denuncias.delete({
            where: {
                id_denuncia: findDenuncia.id_denuncia
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeleteDenunciaService }
