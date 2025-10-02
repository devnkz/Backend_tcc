import prismaClient from "../../prisma";

class listComponenteService {
  async execute() {
    const componentes = await prismaClient.componente.findMany({
      include: {
        curso: {
          select: {
            id_curso: true,
            nome_curso: true,
          },
        },
      },
    });

    return componentes;
  }
}

export { listComponenteService }; 