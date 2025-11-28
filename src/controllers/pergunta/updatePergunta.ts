import { FastifyRequest, FastifyReply } from "fastify";
import { UpdatePerguntaService } from "../../services/pergunta/updatePergunta";


class UpdatePerguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const userId: string = (request as any).user?.id;
        const { pergunta, fkId_componente, fkId_curso, visibilidade_pergunta } = request.body as { 
            pergunta: string; 
            fkId_componente: string; 
            fkId_curso: string;
            visibilidade_pergunta: boolean;
        };

        const Pergunta = new UpdatePerguntaService();
        const updatedPergunta = await Pergunta.execute({ 
            id, 
            userId, 
            pergunta, 
            fkId_componente,
            fkId_curso,
            visibilidade_pergunta
        });

        reply.send(updatedPergunta);
    }
}

export { UpdatePerguntaController };