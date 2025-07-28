import prismaClient from "../../prisma";

interface UpdateArtigoProps {
  id: string;
  fkIdComponente?: string;
  nomeArtigo?: string;
  textoArtigo?: string;
}

class updateArtigoService {
  async execute({ id, fkIdComponente, nomeArtigo, textoArtigo }: UpdateArtigoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const artigo = await prismaClient.artigo.update({
      where: {
        id: id,
      },
      data: {
        fkIdComponente,
        nomeArtigo,
        textoArtigo,
      },
    });

    return artigo;
  }
}

export { updateArtigoService }; 