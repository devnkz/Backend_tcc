import prismaClient from "../../prisma";

interface CreateComponenteProps {
  nome: string;
  fkIdCurso: string;
}

class CreateComponenteService {
  async execute({ nome, fkIdCurso }: CreateComponenteProps) {
    if (!nome || !fkIdCurso) {
      throw new Error("Informações faltando");
    }

    const componente = await prismaClient.componente.create({
      data: {
        nome,
        fkIdCurso,
      },
      include: {
        curso: {
          select: {
            id: true,
            nome: true, // já retorna o nome do curso
          },
        },
      },
    });

    return componente;
  }
}

export { CreateComponenteService };
