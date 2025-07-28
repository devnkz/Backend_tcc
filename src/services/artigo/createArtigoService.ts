import prismaClient from "../../prisma";

interface CreateArtigoProps {
  fkIdComponente: string;
  nomeArtigo: string;
  textoArtigo: string;
}

class createArtigoService {
  async execute({ fkIdComponente, nomeArtigo, textoArtigo }: CreateArtigoProps) {
    if (!fkIdComponente || !nomeArtigo || !textoArtigo) {
      throw new Error("Informações faltando");
    }

    const artigo = await prismaClient.artigo.create({
      data: {
        fkIdComponente,
        nomeArtigo,
        textoArtigo,
      },
    });

    return artigo;
  }
}

export { createArtigoService }; 