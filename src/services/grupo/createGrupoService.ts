import prismaClient from "../../prisma";

class CreateGrupoService {
  async execute(
    nomeGrupo: string,
    fkIdComponente: string,
    membrosIds: string[],
    createdById: string // 👈 quem está criando o grupo
  ) {
    const grupo = await prismaClient.grupo.create({
      data: {
        nomeGrupo,
        fkIdComponente,
        createdById, // 👈 adiciona o criador
        membros: {
          create: membrosIds.map((userId) => ({ userId })),
        },
      },
      include: {
        componente: true,       // pra nome do componente aparecer
        membros: { include: { user: true } }, // pra membros aparecerem
        createdBy: true,        // opcional: retorna dados do criador
      },
    });

    return grupo;
  }
}

export { CreateGrupoService };
