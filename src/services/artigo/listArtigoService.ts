import prismaClient from "../../prisma";

class listArtigoService {
  async execute() {
    const artigos = await prismaClient.artigo.findMany();

    return artigos;
  }
}

export { listArtigoService }; 