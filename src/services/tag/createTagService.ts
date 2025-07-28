import prismaClient from "../../prisma";

interface CreateTagProps {
  nomeTag: string;
  descricaoTag: string;
}

class createTagService {
  async execute({ nomeTag, descricaoTag }: CreateTagProps) {
    if (!nomeTag || !descricaoTag) {
      throw new Error("Informações faltando");
    }

    const tag = await prismaClient.tag.create({
      data: {
        nomeTag,
        descricaoTag,
      },
    });

    return tag;
  }
}

export { createTagService }; 