import  prisma  from "../../prisma";

class AchievementService {
  async addProgress(usuarioId: string, conquistaId: string, incremento: number) {
    const conquista = await prisma.conquista.findUnique({
      where: { id: conquistaId },
    });

    if (!conquista) return;

    const progresso = await prisma.progressoConquista.findFirst({
      where: { usuarioId, conquistaId },
    });

    if (!progresso) {
      const valor = Math.min(incremento, conquista.progressoMax);

      return prisma.progressoConquista.create({
        data: {
          usuarioId,
          conquistaId,
          progresso: valor,
          concluida: valor >= conquista.progressoMax,
        },
      });
    }

    const novoValor = Math.min(progresso.progresso + incremento, conquista.progressoMax);

    return prisma.progressoConquista.update({
      where: { id: progresso.id },
      data: {
        progresso: novoValor,
        concluida: novoValor >= conquista.progressoMax,
      },
    });
  }
}

export const achievementService = new AchievementService();
