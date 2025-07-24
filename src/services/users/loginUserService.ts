import jwt from "jsonwebtoken"
import prismaClient from "../../prisma";

interface LoginUserProps {
    email: string,
    senha:string
}

class LoginUserService{
    async execute({email, senha} : LoginUserProps){

        const findUser = await prismaClient.user.findFirst({
            where: {
                email: email,
                senha: senha
            }
        })

        console.log(findUser)

        if(!findUser){
            throw new Error("Usuário não encontrado")
        }

         const token = jwt.sign(
            { id: findUser.id, name: findUser.name, apelido: findUser.apelido, email: findUser.email, senha: findUser.senha },
            process.env.JWT_SECRET || "secreto",
            { expiresIn: "48h" }
        );

        return { user: findUser, token };
    }
}

export {LoginUserService}