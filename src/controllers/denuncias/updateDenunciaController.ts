import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateDenunciaService } from "../../services/denuncias/updateDenunciaService";

class UpdateDenunciaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const { fkId_usuario, fkId_conteudo_denunciado, nivel_denuncia, status, resultado } = request.body as { 
            fkId_usuario: string; 
            fkId_conteudo_denunciado: string; 
            nivel_denuncia: number; 
            status: string;
            resultado: string;
        };

        const updateDenuncia = new UpdateDenunciaService();
        const updatedDenuncia = await updateDenuncia.execute({ 
            id, 
            fkId_usuario, 
            fkId_conteudo_denunciado, 
            nivel_denuncia, 
            status,
            resultado 
        });

        reply.send(updatedDenuncia);
    }
}

export { UpdateDenunciaController };
