import prismaClient from "../../prisma";

class RemoveMembroService {
  async execute(requesterId: string, grupoId: string, membroId: string) {
    // 1️⃣ Verifica se o grupo existe
    const grupo = await prismaClient.grupo.findUnique({
      where: { id: grupoId },
    });

    if (!grupo) throw new Error("Grupo não encontrado");

    // 2️⃣ Checa se quem está removendo é o criador
    if (grupo.createdById !== requesterId) {
      throw new Error(`⚠️ Tentativa de remoção por: ${requesterId}, mas o criador é: ${grupo.createdById}`);
    }

    // 3️⃣ Verifica se o membro existe no grupo
    const membro = await prismaClient.membro.findUnique({
      where: { id: membroId },
    });

    if (!membro || membro.grupoId !== grupoId) {
      throw new Error("Membro não encontrado no grupo");
    }

    // 4️⃣ Remove o membro
    await prismaClient.membro.delete({
      where: { id: membro.id },
    });

    return { message: "Membro removido com sucesso" };
  }
}

export { RemoveMembroService };
