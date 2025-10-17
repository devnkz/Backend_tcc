import { FastifyRequest, FastifyReply } from "fastify";
import { CreateDenunciaService } from "../../services/denuncias/createDenunciaService";

interface CreateDenunciaBody {
  fkId_usuario: string;
  fkId_conteudo_denunciado: string;
  fkId_usuario_conteudo: string;
  nivel_denuncia: number;
  descricao: string;
  tipo_conteudo: string;
  resultado: string;
}

class CreateDenunciaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fkId_usuario, fkId_conteudo_denunciado, nivel_denuncia, resultado, descricao,fkId_usuario_conteudo,  tipo_conteudo } = request.body as CreateDenunciaBody;

    const createDenuncia = new CreateDenunciaService();

    try {
      const denuncia = await createDenuncia.execute({
        fkId_usuario,
        fkId_conteudo_denunciado,
        fkId_usuario_conteudo,
        nivel_denuncia,
        resultado,
        descricao,
        tipo_conteudo,
      });

      return reply.send(denuncia);
    } catch (error) {
      console.error("Erro ao criar denúncia:", error);
      return reply.status(500).send({ error: "Erro interno ao criar denúncia." });
    }
  }
}

export { CreateDenunciaController };
