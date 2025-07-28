import prismaClient from "../../prisma";

interface UpdateGrupoProps {
  id: string;
  nomeGrupo?: string;
  fkIdComponente?: string;
}

class updateGrupoService {
  async execute({ id, nomeGrupo, fkIdComponente }: UpdateGrupoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const grupo = await prismaClient.grupo.update({
      where: {
        id: id,
      },
      data: {
        nomeGrupo,
        fkIdComponente,
      },
    });

    return grupo;
  }
}

export { updateGrupoService }; 