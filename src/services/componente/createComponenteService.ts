import prismaClient from "../../prisma";

interface CreateComponenteProps {
  nomeComponente: string;
  fkIdCurso: string;
}

class createComponenteService {
  async execute({ nomeComponente, fkIdCurso }: CreateComponenteProps) {
    if (!nomeComponente || !fkIdCurso) {
      throw new Error("Informações faltando");
    }

    const componente = await prismaClient.componente.create({
      data: {
        nomeComponente,
        fkIdCurso,
      },
    });

    return componente;
  }
}

export { createComponenteService }; 