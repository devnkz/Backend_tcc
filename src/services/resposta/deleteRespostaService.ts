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
      where: { id },
      include: { pergunta: true }, // para acessar o dono da pergunta
    });

    if (!findResposta) {
      throw new Error("Resposta não encontrada");
    }

    // Verifica permissão: dono da resposta OU dono da pergunta
    const podeDeletar =
      findResposta.userId === deleteUser || findResposta.pergunta.userId === deleteUser;

    if (!podeDeletar) {
      throw new Error(
        `Usuário sem permissão. deleteUser: ${deleteUser}, dono da resposta: ${findResposta.userId}, dono da pergunta: ${findResposta.pergunta.userId}`
      );
    }

    // Deleta a resposta
    await prismaClient.resposta.delete({
      where: { id },
    });

    return { message: "Deletado com sucesso!" };
  }
}

export { DeleteRespostaService };
