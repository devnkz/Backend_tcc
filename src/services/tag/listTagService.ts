import prismaClient from "../../prisma";

class listTagService {
  async execute() {
    const tags = await prismaClient.tag.findMany();

    return tags;
  }
}

export { listTagService }; 