import { FastifyRequest, FastifyReply } from "fastify";
import { UpdatePenalidadeService } from "../../services/penalidades/updatePenalidadeService";

class UpdatePenalidadeController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const { fkId_usuario, fkId_denuncia, banimento, perder_credibilidade, descricao, ativa } = request.body as { 
            fkId_usuario: string; 
            fkId_denuncia: string; 
            banimento?: string; 
            perder_credibilidade: string; 
            descricao: string;
            ativa: boolean;
        };

        const updatePenalidade = new UpdatePenalidadeService();
        const updatedPenalidade = await updatePenalidade.execute({ 
            id, 
            fkId_usuario, 
            fkId_denuncia, 
            banimento, 
            perder_credibilidade, 
            descricao,
            ativa 
        });

        reply.send(updatedPenalidade);
    }
}

export { UpdatePenalidadeController };
