import prismaClient from "../../prisma";

interface CreateRespostaProps {
  fkIdPergunta: string;
  fkIdUsuario: string;
  resposta: string;
}

class createRespostaService {
  async execute({ fkIdPergunta, fkIdUsuario, resposta }: CreateRespostaProps) {
    if (!fkIdPergunta || !fkIdUsuario || !resposta) {
      throw new Error("Informações faltando");
    }

    const respostaCriada = await prismaClient.resposta.create({
      data: {
        fkIdPergunta,
        fkIdUsuario,
        resposta,
      },
    });

    return respostaCriada;
  }
}

export { createRespostaService }; 