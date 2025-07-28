import prismaClient from "../../prisma";

class listComentarioService {
  async execute() {
    const comentarios = await prismaClient.comentario.findMany();

    return comentarios;
  }
}

export { listComentarioService }; 