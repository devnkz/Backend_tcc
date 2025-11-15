import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

interface ListUserId {
  id?: string;
}

class ListUserIdService {
  async execute({ id }: ListUserId) {
    if (id) {
      try {
        const users = await prismaClient.usuarios.findUnique({
          where: { id_usuario: id },
          include: {
            tipoUsuario: {
              select: {
                id_tipousuario: true,
                nome_tipousuario: true,
              },
            },
            Penalidades: {
              select: {
                id_penalidade: true,
                dataInicio_penalidade: true,
                dataFim_penalidade: true,
                perder_credibilidade: true,
                descricao: true,
                ativa: true,
                denuncia: {
                  select: {
                    id_denuncia: true,
                    tipo_conteudo: true,
                    fkId_conteudo_denunciado: true,
                  },
                },
              },
            },
          },
        });

        return users;
      } catch (err: any) {
        // Se o erro for causado por coluna ausente devido a migração pendente,
        // faz um fallback para buscar apenas os campos básicos (sem colunas novas).
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2022" &&
          err.meta?.column &&
          String(err.meta.column).includes("ultimaAlteracao_apelido")
        ) {
          const fallback = await prismaClient.usuarios.findUnique({
            where: { id_usuario: id },
            select: {
              id_usuario: true,
              nome_usuario: true,
              apelido_usuario: true,
              foto_perfil: true,
              email_usuario: true,
              credibilidade_usuario: true,
              fkIdTipoUsuario: true,
              dataCriacao_usuario: true,
              cursoId_curso: true,
            },
          });

          return fallback;
        }

        // rethrow para ser tratado pelo controller
        throw err;
      }
    }
  }
}

export { ListUserIdService };
