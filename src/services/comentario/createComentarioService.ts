import prismaClient from "../../prisma";

interface CreateComentarioProps {
  fkIdResposta: string;
  fkIdUsuario: string;
  comentario: string;
}

class createComentarioService {
  async execute({ fkIdResposta, fkIdUsuario, comentario }: CreateComentarioProps) {
    if (!fkIdResposta || !fkIdUsuario || !comentario) {
      throw new Error("Informações faltando");
    }

    const comentarioCriado = await prismaClient.comentario.create({
      data: {
        fkIdResposta,
        fkIdUsuario,
        comentario,
      },
    });

    return comentarioCriado;
  }
}

export { createComentarioService }; 