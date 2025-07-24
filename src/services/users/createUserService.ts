import prismaClient from "../../prisma";

interface CreateUserProps {
    name: string,
    apelido: string,
    email: string,
    senha: string
}

class createUserService {
    async execute({ name, apelido, email, senha }: CreateUserProps) {
        if (!name || !apelido || !email || !senha) {
            throw new Error("Informacoes faltando");
        }

        const user = await prismaClient.user.create({
            data: {
                name,
                apelido,
                email,
                senha,
            }
        })

        return user
    }
}

export { createUserService };