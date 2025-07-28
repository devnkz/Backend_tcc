import { FastifyRequest, FastifyReply } from "fastify";
import { listRespostaService } from "../../services/resposta/listRespostaService";

class ListRespostaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listResposta = new listRespostaService();

    try {
      const respostas = await listResposta.execute();
      return reply.send(respostas);
    } catch (error) {
      console.error("Erro ao listar respostas:", error);
      return reply.status(500).send({ error: "Erro interno ao listar respostas." });
    }
  }
}

export { ListRespostaController }; 