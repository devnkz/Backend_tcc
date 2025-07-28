import prismaClient from "../../prisma";

interface UpdateComponenteProps {
  id: string;
  nomeComponente?: string;
  fkIdCurso?: string;
}

class updateComponenteService {
  async execute({ id, nomeComponente, fkIdCurso }: UpdateComponenteProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const componente = await prismaClient.componente.update({
      where: {
        id: id,
      },
      data: {
        nomeComponente,
        fkIdCurso,
      },
    });

    return componente;
  }
}

export { updateComponenteService }; 