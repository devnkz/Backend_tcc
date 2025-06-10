import prismaClient from "../../prisma";

interface UpdateUserProps {
    id: string;
    name: string;
    email: string;
}

class UpdateUserService {
    async execute({ id, name, email }: UpdateUserProps) {
        // Buscar usuário pelo ID
        const findUser = await prismaClient.user.findUnique({
            where: { id }
        });

        if (!findUser) {
            throw new Error("Usuário não encontrado");
        }

        // Atualizar usuário e retornar os dados modificados
        const updatedUser = await prismaClient.user.update({
            where: { id },
            data: { name, email }
        });

        return updatedUser;
    }
}

export { UpdateUserService };
