import prismaClient from "../../prisma";

interface UpdateUserProps {
    id: string;
    name: string;
    apelido: string;
    email: string;
    senha: string;
}

class UpdateUserService {
    async execute({ id, name, apelido, email, senha }: UpdateUserProps) {
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
            data: { name, apelido, email, senha },
            include:{curso: true}
        });

        return updatedUser;
    }
}

export { UpdateUserService };
