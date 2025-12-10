import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateFotoPerguntaService } from "../../services/pergunta/updateFotoPergunta";

export class UpdateFotoPerguntaController {
  async handle(request: any, reply: FastifyReply) {
    const { id } = request.params;

    if (!request.file) {
      return reply.status(400).send({ error: "Nenhum arquivo enviado" });
    }
  
    const foto_pergunta = `http://localhost:3333/uploads/${request.file.filename}`;

    const service = new UpdateFotoPerguntaService();
    const user = await service.execute({ id, foto_pergunta });

    return reply.send(user);
  }
}
