import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";

class CreateGrupoService {
  async execute(
    nome_grupo: string,
    membrosIds: string[],
    createdById: string
  ) {
    const nomeValidado = validarTextoOuErro(nome_grupo);

    const grupo = await prismaClient.grupo.create({
      data: {
        nome_grupo: nomeValidado.textoFiltrado,
        fkId_usuario: createdById, // 👈 adiciona o criador
        membros: {
          create: membrosIds.map((userId) => ({ 
            fkId_usuario: userId 
          })),
        },
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

    return grupo;
  }
}

export { CreateGrupoService };
