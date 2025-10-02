import prismaClient from "../../prisma";

class RemoveMembroService {
  async execute(requesterId: string, grupoId: string, membroId: string) {
    // 1️⃣ Verifica se o grupo existe
    const grupo = await prismaClient.grupo.findUnique({
      where: { id_grupo: grupoId },
    });

    if (!grupo) throw new Error("Grupo não encontrado");

    // 2️⃣ Checa se quem está removendo é o criador
    if (grupo.fkId_usuario !== requesterId) {
      throw new Error(`⚠️ Tentativa de remoção por: ${requesterId}, mas o criador é: ${grupo.fkId_usuario}`);
    }

    // 3️⃣ Verifica se o membro existe no grupo
    const membro = await prismaClient.membro.findUnique({
      where: { id_membro: membroId },
    });

    if (!membro || membro.fkId_grupo !== grupoId) {
      throw new Error("Membro não encontrado no grupo");
    }

    // 4️⃣ Remove o membro
    await prismaClient.membro.delete({
      where: { id_membro: membro.id_membro },
    });

    return { message: "Membro removido com sucesso" };
  }
}

export { RemoveMembroService };
