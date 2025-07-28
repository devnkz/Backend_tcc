import prismaClient from "../../prisma";

interface UpdateTagProps {
  id: string;
  nomeTag?: string;
  descricaoTag?: string;
}

class updateTagService {
  async execute({ id, nomeTag, descricaoTag }: UpdateTagProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const tag = await prismaClient.tag.update({
      where: {
        id: id,
      },
      data: {
        nomeTag,
        descricaoTag,
      },
    });

    return tag;
  }
}

export { updateTagService }; 