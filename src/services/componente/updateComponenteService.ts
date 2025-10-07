import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";

interface UpdateComponenteProps {
  id: string;
  nome_componente?: string;
  fkId_curso?: string;
}

class updateComponenteService {
  async execute({ id, nome_componente, fkId_curso }: UpdateComponenteProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const componente = await prismaClient.componente.update({
      where: {
        id_componente: id,
      },
      data: {
        nome_componente: typeof nome_componente === "string" ? validarTextoOuErro(nome_componente).textoFiltrado : undefined,
        fkId_curso,
      },
      include: {
        curso: {
          select: {
            id_curso: true,
            nome_curso: true,
          },
        },
      },
    });

    return componente;
  }
}

export { updateComponenteService }; 