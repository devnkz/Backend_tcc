import prismaClient from "../../prisma";

interface UpdateGrupoProps {
  id: string;
  nome_grupo?: string;
  novosMembrosIds?: string[];
}

class updateGrupoService {
  async execute({ id, nome_grupo, novosMembrosIds }: UpdateGrupoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const grupoAtualizado = await prismaClient.grupo.update({
      where: { id_grupo: id },
      data: {
        nome_grupo,
        membros: novosMembrosIds
          ? {
              create: novosMembrosIds.map((userId) => ({ 
                fkId_usuario: userId 
              })),
            }
          : undefined,
      },
      include: {
        membros: { 
          include: { 
            usuario: true 
          } 
        },
        usuario: true,
      },
    });

    return grupoAtualizado;
  }
}

export { updateGrupoService };
