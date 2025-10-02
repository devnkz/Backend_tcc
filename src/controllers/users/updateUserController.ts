import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../../services/users/updateUserService";

class UpdateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const { nome_usuario, apelido_usuario, email_usuario, senha_usuario, foto_perfil } = request.body as { 
            nome_usuario: string; 
            apelido_usuario: string; 
            email_usuario: string; 
            senha_usuario: string; 
            foto_perfil?: string;
        };

        const updateUser = new UpdateUserService();
        const updatedUser = await updateUser.execute({ 
            id, 
            nome_usuario, 
            apelido_usuario, 
            email_usuario, 
            senha_usuario, 
            foto_perfil 
        });

        reply.send(updatedUser);
    }
}

export { UpdateUserController };
