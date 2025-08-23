import prismaClient from "../../prisma";

class CreateGrupoService {
  async execute(nomeGrupo: string, fkIdComponente: string, membrosIds: string[]) {
    const grupo = await prismaClient.grupo.create({
      data: {
        nomeGrupo,
        fkIdComponente,
        membros: {
          create: membrosIds.map(userId => ({ userId })),
        },
      },
      include: {
        membros: { include: { user: true } },
      },
    });

    return grupo;
  }
}

export { CreateGrupoService };
