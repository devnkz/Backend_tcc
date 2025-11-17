import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";

interface UpdateRespostaProps {
  id: string;
  fkId_pergunta: string;
  fkId_usuario: string;
  resposta: string;
}

class updateRespostaService {
  async execute({ id, fkId_pergunta, fkId_usuario, resposta }: UpdateRespostaProps) {
    if (!id || !fkId_pergunta || !fkId_usuario || !resposta) {
      throw new Error("Dados faltando");
    }

    const respostaValidada = validarTextoOuErro(resposta);

    const respostaAtualizada = await prismaClient.resposta.update({
      where: {
        id_resposta: id,
      },
      data: {
        fkId_pergunta,
        fkId_usuario,
        resposta: respostaValidada.textoFiltrado,
        dataAtualizacao_resposta: new Date(),
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

    return respostaAtualizada;
  }
}

export { updateRespostaService }; 