import prismaClient from "../../prisma";

interface DeleteRespostaProps {
  id: string;
  deleteUser: string; // ID do usuário logado (do token)
}

class DeleteRespostaService {
  async execute({ id, deleteUser }: DeleteRespostaProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    // Busca a resposta e inclui a pergunta relacionada
    const findResposta = await prismaClient.resposta.findFirst({
      where: { id_resposta: id },
      include: { 
        pergunta: {
          select: {
            id_pergunta: true,
            fkId_usuario: true,
          }
        }
      }, // para acessar o dono da pergunta
    });

    if (!findResposta) {
      throw new Error("Resposta não encontrada");
    }

    // Verifica permissão: dono da resposta OU dono da pergunta
    const podeDeletar =
      findResposta.fkId_usuario === deleteUser || findResposta.pergunta.fkId_usuario === deleteUser;

    if (!podeDeletar) {
      throw new Error(
        `Usuário sem permissão. deleteUser: ${deleteUser}, dono da resposta: ${findResposta.fkId_usuario}, dono da pergunta: ${findResposta.pergunta.fkId_usuario}`
      );
    }

    // Deleta a resposta
    await prismaClient.resposta.delete({
      where: { id_resposta: id },
    });

    return { message: "Deletado com sucesso!" };
  }
}

export { DeleteRespostaService };
