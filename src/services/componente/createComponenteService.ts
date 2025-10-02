import prismaClient from "../../prisma";

interface CreateComponenteProps {
  nome_componente: string;
  fkId_curso: string;
}

class CreateComponenteService {
  async execute({ nome_componente, fkId_curso }: CreateComponenteProps) {
    if (!nome_componente || !fkId_curso) {
      throw new Error("Informações faltando");
    }

    const componente = await prismaClient.componente.create({
      data: {
        nome_componente,
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
