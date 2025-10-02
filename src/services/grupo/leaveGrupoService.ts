// services/grupo/leaveGrupoService.ts
import prismaClient from "../../prisma";

class LeaveGrupoService {
  async execute(grupoId: string, userId: string) {
    // Remove o membro do grupo baseado no userId do token
    const membroRemovido = await prismaClient.membro.deleteMany({
      where: {
        fkId_usuario: userId,
        fkId_grupo: grupoId,
      },
    });

    return membroRemovido;
  }
}

export { LeaveGrupoService };
