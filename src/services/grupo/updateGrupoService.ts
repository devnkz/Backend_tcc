import prismaClient from "../../prisma";

interface UpdateGrupoProps {
  id: string;
  nomeGrupo?: string;
  fkIdComponente?: string;
  novosMembrosIds?: string[];
}

class updateGrupoService {
  async execute({ id, nomeGrupo, fkIdComponente, novosMembrosIds }: UpdateGrupoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const grupoAtualizado = await prismaClient.grupo.update({
      where: { id },
      data: {
        nomeGrupo,
        fkIdComponente,
        membros: novosMembrosIds
          ? {
              create: novosMembrosIds.map((userId) => ({ userId })),
            }
          : undefined,
      },
      include: {
        membros: { include: { user: true } },
        componente: true,
      },
    });

    return grupoAtualizado;
  }
}

export { updateGrupoService };
