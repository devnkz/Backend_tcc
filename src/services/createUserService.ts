import prismaClient from "../prisma";

interface CreateUserProps {
    name: string,
    email: string
}

class createUserService {
    async execute({ name, email }: CreateUserProps) {
        if (!name || !email) {
            throw new Error("Informacoes faltando");
        }

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
            }
        })

        return user
    }
}

export { createUserService };