import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../../services/users/updateUserService";

// Apenas administradores podem trocar fkIdTipoUsuario; usuários comuns podem alterar seus próprios dados básicos
function canChangeTipoUsuario(requestingRole?: string) {
    const r = requestingRole?.toLowerCase();
    return r === "adm" || r === "admin";
}

class UpdateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const { nome_usuario, apelido_usuario, email_usuario, senha_usuario, foto_perfil, fkIdTipoUsuario } = request.body as { 
            nome_usuario: string; 
            apelido_usuario: string; 
            email_usuario: string; 
            senha_usuario: string; 
            foto_perfil?: string;
            fkIdTipoUsuario?: string;
        };

        const requester = (request as any).user as { id: string; role?: string } | undefined;

        // Se tentar mudar fkIdTipoUsuario e não for admin -> negar
        if (fkIdTipoUsuario && !canChangeTipoUsuario(requester?.role)) {
            return reply.status(403).send({ error: "Apenas administradores podem alterar o tipo de usuário" });
        }

        // Se não for admin e estiver tentando atualizar outro usuário -> negar
        if (requester && requester.id !== id && !canChangeTipoUsuario(requester.role)) {
            return reply.status(403).send({ error: "Sem permissão para alterar outro usuário" });
        }

        const updateUser = new UpdateUserService();
        const updatedUser = await updateUser.execute({
            id,
            nome_usuario,
            apelido_usuario,
            email_usuario,
            senha_usuario,
            foto_perfil,
            fkIdTipoUsuario: fkIdTipoUsuario // somente passado se admin pelo bloco anterior
        });

        reply.send(updatedUser);
    }
}

export { UpdateUserController };
