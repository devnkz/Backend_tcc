import prismaClient from "../../prisma";

interface UpdateComentarioProps {
  id: string;
  fkIdResposta?: string;
  fkIdUsuario?: string;
  comentario?: string;
}

class updateComentarioService {
  async execute({ id, fkIdResposta, fkIdUsuario, comentario }: UpdateComentarioProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const comentarioAtualizado = await prismaClient.comentario.update({
      where: {
        id: id,
      },
      data: {
        fkIdResposta,
        fkIdUsuario,
        comentario,
      },
    });

    return comentarioAtualizado;
  }
}

export { updateComentarioService }; 