import { FastifyRequest, FastifyReply } from "fastify";
import { UpdatePerguntaService } from "../../services/pergunta/updatePergunta";


class UpdatePerguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const userId: string = (request as any).user?.id;
        const { conteudo, fkIdComponente } = request.body as {  conteudo: string; fkIdComponente: string; };

        const Pergunta = new UpdatePerguntaService();
        const updatedPergunta = await Pergunta.execute({ id, userId, conteudo, fkIdComponente });

        reply.send(updatedPergunta);
    }
}

export { UpdatePerguntaController };