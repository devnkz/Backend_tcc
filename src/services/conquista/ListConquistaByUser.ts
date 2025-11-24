import  prisma  from "../../prisma";

interface ListProps {
  userId: string;
}

class ListConquistasUsuarioService {
  async execute({ userId }: ListProps) {
    const conquistas = await prisma.conquista.findMany({
      orderBy: { titulo: "asc" },
      include: {
        usuarios: {
          where: { usuarioId: userId },
          select: {
            progresso: true,
            atualizadoEm: true
          }
        }
      }
    });

    // organizar dados para retornar progresso mesmo se nunca começou
    return conquistas.map(( c: any ) => {
      const registro = c.usuarios[0];

      const progresso = registro?.progresso ?? 0;
      const completo = progresso >= c.progressoMax;

      return {
        id: c.id,
        titulo: c.titulo,
        descricao: c.descricao,
        progressoAtual: progresso,
        progressoMax: c.progressoMax,
        completo
      };
    });
  }
}

export { ListConquistasUsuarioService };
