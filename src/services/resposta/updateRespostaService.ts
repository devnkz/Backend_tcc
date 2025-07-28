import prismaClient from "../../prisma";

interface UpdateRespostaProps {
  id: string;
  fkIdPergunta?: string;
  fkIdUsuario?: string;
  resposta?: string;
}

class updateRespostaService {
  async execute({ id, fkIdPergunta, fkIdUsuario, resposta }: UpdateRespostaProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const respostaAtualizada = await prismaClient.resposta.update({
      where: {
        id: id,
      },
      data: {
        fkIdPergunta,
        fkIdUsuario,
        resposta,
      },
    });

    return respostaAtualizada;
  }
}

export { updateRespostaService }; 