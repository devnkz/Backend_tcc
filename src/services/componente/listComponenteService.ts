import prismaClient from "../../prisma";

class listComponenteService {
  async execute() {
    const componentes = await prismaClient.componente.findMany();

    return componentes;
  }
}

export { listComponenteService }; 