import prismaClient from "../../prisma";
import { randomUUID } from "crypto";
import { validarTextoOuErro } from "../../utils/filterText";

interface CreateRespostaProps {
  fkId_pergunta: string;
  fkId_usuario: string;
  resposta: string;
}

class CreateRespostaService {
  async execute({ fkId_pergunta, fkId_usuario, resposta }: CreateRespostaProps) {
    if (!fkId_pergunta || !fkId_usuario || !resposta) {
      throw new Error("Informações faltando");
    }

    const respostaValidada = validarTextoOuErro(resposta);

    const respostaCriada = await prismaClient.resposta.create({
      data: {
        id_resposta: randomUUID(),
        fkId_pergunta,
        fkId_usuario,
        resposta: respostaValidada.textoFiltrado,
      },
      include: {
        usuarios: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
        pergunta: {
          select: {
            id_pergunta: true,
            pergunta: true,
          },
        },
      },
    });

    return respostaCriada;
  }
}

export { CreateRespostaService };
