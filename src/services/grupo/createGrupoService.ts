import prismaClient from "../../prisma";
import { randomUUID } from "crypto";
import { validarTextoOuErro } from "../../utils/filterText";

class CreateGrupoService {
  async execute(
    nome_grupo: string,
    membrosIds: string[],
    createdById: string
  ) {
    const nomeValidado = validarTextoOuErro(nome_grupo);
    const allMembrosIds = Array.from(new Set([createdById, ...membrosIds]));

    const grupo = await prismaClient.grupo.create({
      data: {
        id_grupo: randomUUID(),
        nome_grupo: nomeValidado.textoFiltrado,
        fkId_usuario: createdById,
        membro: {
          create: allMembrosIds.map((userId) => ({ 
            id_membro: randomUUID(),
            fkId_usuario: userId 
          })),
        },
      },
      include: {
        membro: {
          include: {
            usuarios: true,
          },
        },
        usuarios: true,
      },
    });

    return grupo;
  }
}

export { CreateGrupoService };
