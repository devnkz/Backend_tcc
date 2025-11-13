import prismaClient from "../../prisma";

interface DeleteCursoProps {
  id: string;
  forceDelete?: boolean;
}

class deleteCursoService {
  async execute({ id, forceDelete = false }: DeleteCursoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    // Verifica se existem componentes e perguntas vinculadas a este curso
    const componentesVinculados = await prismaClient.componente.count({
      where: {
        fkId_curso: id,
      },
    });

    const perguntasVinculadas = await prismaClient.pergunta.count({
      where: {
        fkId_curso: id,
      },
    });

    const totalVinculados = componentesVinculados + perguntasVinculadas;

    if (totalVinculados > 0 && !forceDelete) {
      const error = new Error(
        `Não é possível deletar este curso pois existem ${componentesVinculados} componente(s) e ${perguntasVinculadas} pergunta(s) vinculada(s) a ele.`
      );
      (error as any).code = "HAS_LINKED_DATA";
      (error as any).componentesCount = componentesVinculados;
      (error as any).perguntasCount = perguntasVinculadas;
      throw error;
    }

    // Se forceDelete for true, deleta tudo em cascata
    if (forceDelete && totalVinculados > 0) {
      // Deleta respostas das perguntas vinculadas ao curso
      await prismaClient.resposta.deleteMany({
        where: {
          pergunta: {
            fkId_curso: id,
          },
        },
      });

      // Deleta perguntas vinculadas ao curso
      await prismaClient.pergunta.deleteMany({
        where: {
          fkId_curso: id,
        },
      });

      // Deleta perguntas vinculadas aos componentes do curso
      await prismaClient.pergunta.deleteMany({
        where: {
          componente: {
            fkId_curso: id,
          },
        },
      });

      // Deleta componentes vinculados ao curso
      await prismaClient.componente.deleteMany({
        where: {
          fkId_curso: id,
        },
      });
    }

    // Deleta o curso
    await prismaClient.curso.delete({
      where: {
        id_curso: id,
      },
    });

    return {
      deletedComponents: forceDelete ? componentesVinculados : 0,
      deletedQuestions: forceDelete ? perguntasVinculadas : 0,
    };
  }
}

export { deleteCursoService }; 