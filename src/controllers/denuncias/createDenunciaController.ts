import { FastifyRequest, FastifyReply } from "fastify";
import { CreateDenunciaService } from "../../services/denuncias/createDenunciaService";

interface CreateDenunciaBody {
  fkId_usuario: string;
  fkId_conteudo_denunciado: string;
  nivel_denuncia: number;
  descricao: string
  resultado: string;
}

class CreateDenunciaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkId_usuario, fkId_conteudo_denunciado, nivel_denuncia, resultado, descricao } = request.body as CreateDenunciaBody;

    const createDenuncia = new CreateDenunciaService();

    try {
      const denuncia = await createDenuncia.execute({
        fkId_usuario,
        fkId_conteudo_denunciado,
        nivel_denuncia,
        resultado,
        descricao,
      });

      return reply.send(denuncia);
    } catch (error) {
      console.error("Erro ao criar denúncia:", error);
      return reply.status(500).send({ error: "Erro interno ao criar denúncia." });
    }
  }
}

export { CreateDenunciaController };
