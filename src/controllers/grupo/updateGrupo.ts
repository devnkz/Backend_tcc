import { FastifyRequest, FastifyReply } from "fastify";
import { updateGrupoService } from "../../services/grupo/updateGrupoService";

interface UpdateGrupoBody {
  nome_grupo?: string;
  novosMembrosIds?: string[];
}

interface UpdateGrupoParams {
  id: string;
}

class UpdateGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as UpdateGrupoParams;
    const { nome_grupo, novosMembrosIds } = request.body as UpdateGrupoBody;

    const updateGrupo = new updateGrupoService();

    try {
      const grupo = await updateGrupo.execute({
        id,
        nome_grupo,
        novosMembrosIds,
      });
      return reply.send(grupo);
    } catch (error: any) {
      const message = (error && error.message) || "Erro interno ao atualizar grupo.";
      // Quando a validação de conteúdo impróprio falhar, retornamos 400 com a mensagem clara
      const isValidationError = typeof message === "string" && (
        message.includes("Conteúdo impróprio") ||
        message.toLowerCase().includes("invalido") ||
        message.toLowerCase().includes("inválido")
      );
      console.error("Erro ao atualizar grupo:", message);
      return reply.status(isValidationError ? 400 : 500).send({ error: message });
    }
  }
}

export { UpdateGrupoController };
