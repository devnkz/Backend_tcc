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
        const apelidoTrim = String(apelido_usuario).trim();

        // format validation
            if (!/^(?=.{3,}$)[A-Za-z0-9](?:[A-Za-z0-9._]*[A-Za-z0-9])$/.test(apelidoTrim)) {
                if (/[._]$/.test(apelidoTrim)) {
                    throw new Error("Apelido inválido: não pode terminar com '.' ou '_' .");
                }
                throw new Error("Apelido inválido. Use letras, números, '.' ou '_' sem espaços (mínimo 3 caracteres).");
            }

        // normalize apelido for uniqueness & storage
        const normalize = (s: string) =>
            String(s || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "");
        const apelidoNormalized = normalize(apelidoTrim);

        // check uniqueness (exclude current user) using normalized form
        const conflict = await prismaClient.usuarios.findFirst({ where: { apelido_usuario: apelidoNormalized } });
        if (conflict && conflict.id_usuario !== id) {
            throw new Error("Este apelido já está em uso por outro usuário.");
        }

        // Nota: verificação de cooldown (14 dias) removida temporariamente
        // até que a migração que adiciona `ultimaAlteracao_apelido` seja aplicada.

        const apelidoValidado = validarTextoOuErro(apelidoTrim);

        // Atualizar usuário e retornar os dados modificados
        const updatedUser = await prismaClient.usuarios.update({
            where: { id_usuario: id },
            data: { 
                nome_usuario: nomeValidado.textoFiltrado,
                apelido_usuario: apelidoNormalized,
                email_usuario, 
                senha_usuario,
                foto_perfil,
                ...(fkIdTipoUsuario ? { fkIdTipoUsuario } : {})
            },
            include: {
                tipousuario: true
            }
        });

        return updatedUser;
    }
}

export { UpdateUserService };
