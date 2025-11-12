import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";

interface UpdateUserProps {
    id: string;
    nome_usuario: string;
    apelido_usuario: string;
    email_usuario: string;
    senha_usuario: string;
    foto_perfil?: string;
    fkIdTipoUsuario?: string; // permitir troca do tipo de usuário
}

class UpdateUserService {
    async execute({ id, nome_usuario, apelido_usuario, email_usuario, senha_usuario, foto_perfil, fkIdTipoUsuario }: UpdateUserProps) {
        // Buscar usuário pelo ID
        const findUser = await prismaClient.usuarios.findUnique({
            where: { id_usuario: id }
        });

        if (!findUser) {
            throw new Error("Usuário não encontrado");
        }

        // Validação de texto ofensivo
        const nomeValidado = validarTextoOuErro(nome_usuario);
        const apelidoValidado = validarTextoOuErro(apelido_usuario);

        // Atualizar usuário e retornar os dados modificados
        const updatedUser = await prismaClient.usuarios.update({
            where: { id_usuario: id },
            data: { 
                nome_usuario: nomeValidado.textoFiltrado,
                apelido_usuario: apelidoValidado.textoFiltrado,
                email_usuario, 
                senha_usuario,
                foto_perfil,
                ...(fkIdTipoUsuario ? { fkIdTipoUsuario } : {})
            },
            include: {
                tipoUsuario: true
            }
        });

        return updatedUser;
    }
}

export { UpdateUserService };
