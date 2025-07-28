import prismaClient from "../../prisma";

interface CreateGrupoProps {
  nomeGrupo: string;
  fkIdComponente: string;
}

class createGrupoService {
  async execute({ nomeGrupo, fkIdComponente }: CreateGrupoProps) {
    if (!nomeGrupo || !fkIdComponente) {
      throw new Error("Informações faltando");
    }

    const grupo = await prismaClient.grupo.create({
      data: {
        nomeGrupo,
        fkIdComponente,
      },
    });

    return grupo;
  }
}

export { createGrupoService }; 