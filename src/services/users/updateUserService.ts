import prismaClient from "../../prisma";

interface UpdateUserProps {
    id: string;
    nome_usuario: string;
    apelido_usuario: string;
    email_usuario: string;
    senha_usuario: string;
    foto_perfil?: string;
}

class UpdateUserService {
    async execute({ id, nome_usuario, apelido_usuario, email_usuario, senha_usuario, foto_perfil }: UpdateUserProps) {
        // Buscar usuário pelo ID
        const findUser = await prismaClient.usuarios.findUnique({
            where: { id_usuario: id }
        });

        if (!findUser) {
            throw new Error("Usuário não encontrado");
        }

        // Atualizar usuário e retornar os dados modificados
        const updatedUser = await prismaClient.usuarios.update({
            where: { id_usuario: id },
            data: { 
                nome_usuario, 
                apelido_usuario, 
                email_usuario, 
                senha_usuario,
                foto_perfil 
            },
            include: {
                tipoUsuario: true
            }
        });

        return updatedUser;
    }
}

export { UpdateUserService };
