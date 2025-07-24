import { FastifyRequest, FastifyReply } from "fastify";
import { UpdatePerguntaService } from "../../services/pergunta/updatePergunta";


class UpdatePerguntaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Recuperar `id` da URL e os demais dados do corpo
        const { id } = request.params as { id: string };
        const { fkIdUsuario, pergunta, fkIdComponent } = request.body as { fkIdUsuario: string; pergunta: string; fkIdComponent: string; };

        const Pergunta = new UpdatePerguntaService();
        const updatedPergunta = await Pergunta.execute({ id, fkIdUsuario, pergunta, fkIdComponent });

        reply.send(updatedPergunta);
    }
}

export { UpdatePerguntaController };