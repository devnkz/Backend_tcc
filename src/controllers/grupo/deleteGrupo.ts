import { FastifyRequest, FastifyReply } from "fastify";
import { deleteGrupoService } from "../../services/grupo/deleteGrupoService";
import prismaClient from "../../prisma";

interface DeleteGrupoParams {
  id: string;
}

class DeleteGrupoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as DeleteGrupoParams;
    const requester = (request as any).user as { id: string; role?: string } | undefined;
    if (!requester?.id) {
      return reply.status(401).send({ error: "Não autenticado" });
    }
    try {
      // Verifica existência e propriedade
      const grupo = await prismaClient.grupo.findUnique({
        where: { id_grupo: id },
        select: { id_grupo: true, fkId_usuario: true }
      });
      if (!grupo) {
        return reply.status(404).send({ error: "Grupo não encontrado" });
      }
      if (grupo.fkId_usuario !== requester.id) {
        return reply.status(403).send({ error: "Somente o criador pode excluir o grupo" });
      }
      const deleteGrupo = new deleteGrupoService();
      await deleteGrupo.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar grupo:", error);
      return reply.status(500).send({ error: "Erro interno ao deletar grupo." });
    }
  }
}

export { DeleteGrupoController }; 