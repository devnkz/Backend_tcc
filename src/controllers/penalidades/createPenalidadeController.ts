import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePenalidadeService } from "../../services/penalidades/createPenalidadeService";

interface CreatePenalidadeBody {
  fkId_usuario: string;
  fkId_denuncia: string;
  dataInicio_penalidade: Date;
  dataFim_penalidade: Date;
  perder_credibilidade: number;
  descricao: string;
}

class CreatePenalidadeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkId_usuario, fkId_denuncia, dataInicio_penalidade, dataFim_penalidade, perder_credibilidade, descricao } = request.body as CreatePenalidadeBody;

    const createPenalidade = new CreatePenalidadeService();

    try {
      const penalidade = await createPenalidade.execute({
        fkId_usuario,
        fkId_denuncia,
        dataInicio_penalidade,
        dataFim_penalidade,
        perder_credibilidade,
        descricao,
      });

      return reply.send(penalidade);
    } catch (error) {
      console.error("Erro ao criar penalidade:", error);
      return reply.status(500).send({ error: "Erro interno ao criar penalidade." });
    }
  }
}

export { CreatePenalidadeController };
