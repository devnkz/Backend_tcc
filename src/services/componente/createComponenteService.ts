import prismaClient from "../../prisma";
import { randomUUID } from "crypto";
import { validarTextoOuErro } from "../../utils/filterText";

interface CreateComponenteProps {
  nome_componente: string;
  fkId_curso: string;
}

class CreateComponenteService {
  async execute({ nome_componente, fkId_curso }: CreateComponenteProps) {
    if (!nome_componente || !fkId_curso) {
      throw new Error("Informações faltando");
    }

    const nomeValidado = validarTextoOuErro(nome_componente);

    const componente = await prismaClient.componente.create({
      data: {
        id_componente: randomUUID(),
        nome_componente: nomeValidado.textoFiltrado,
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

export { CreateComponenteService };
