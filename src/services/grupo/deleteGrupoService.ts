import prismaClient from "../../prisma";

interface DeleteGrupoProps {
  id: string;
}

class deleteGrupoService {
  async execute({ id }: DeleteGrupoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }
    // Remoção segura com transação: limpa dependências antes do grupo
    await prismaClient.$transaction(async (tx: any) => {
      // 1) Quebra vínculos de replies entre mensagens (self-relation)
      await tx.mensagem.updateMany({
        where: { fkId_grupo: id, NOT: { replyToId: null } },
        data: { replyToId: null },
      });

      // 2) Remove mensagens do grupo
      await tx.mensagem.deleteMany({ where: { fkId_grupo: id } });

      // 3) Remove membros do grupo
      await tx.membro.deleteMany({ where: { fkId_grupo: id } });

      // 4) Finalmente remove o grupo
      await tx.grupo.delete({ where: { id_grupo: id } });
    });
  }
}

export { deleteGrupoService }; 