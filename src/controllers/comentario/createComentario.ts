import { FastifyRequest, FastifyReply } from "fastify";
import { createComentarioService } from "../../services/comentario/createComentarioService";

interface CreateComentarioBody {
  fkIdResposta: string;
  fkIdUsuario: string;
  comentario: string;
}

class CreateComentarioController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkIdResposta, fkIdUsuario, comentario } = request.body as CreateComentarioBody;

    const createComentario = new createComentarioService();

    try {
      const comentarioCriado = await createComentario.execute({ fkIdResposta, fkIdUsuario, comentario });
      return reply.send(comentarioCriado);
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      return reply.status(500).send({ error: "Erro interno ao criar comentário." });
    }
  }
}

export { CreateComentarioController }; 