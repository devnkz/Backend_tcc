import prismaClient from "../../prisma";

interface DeleteComponenteProps {
  id: string;
  forceDelete?: boolean;
}

class deleteComponenteService {
  async execute({ id, forceDelete = false }: DeleteComponenteProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    // Verifica se existem perguntas vinculadas a este componente
    const perguntasVinculadas = await prismaClient.pergunta.count({
      where: {
        fkId_componente: id,
      },
    });

    if (perguntasVinculadas > 0 && !forceDelete) {
      const error = new Error(
        `Não é possível deletar este componente pois existem ${perguntasVinculadas} pergunta(s) vinculada(s) a ele.`
      );
      (error as any).code = "HAS_LINKED_QUESTIONS";
      (error as any).count = perguntasVinculadas;
      throw error;
    }

    // Se forceDelete for true, deleta as perguntas vinculadas primeiro
    if (forceDelete && perguntasVinculadas > 0) {
      // Deleta respostas das perguntas vinculadas
      await prismaClient.resposta.deleteMany({
        where: {
          pergunta: {
            fkId_componente: id,
          },
        },
      });

      // Deleta as perguntas vinculadas
      await prismaClient.pergunta.deleteMany({
        where: {
          fkId_componente: id,
        },
      });
    }

    // Deleta o componente
    await prismaClient.componente.delete({
      where: {
        id_componente: id,
      },
    });

    return {
      deletedQuestions: forceDelete ? perguntasVinculadas : 0,
    };
  }
}

export { deleteComponenteService }; 