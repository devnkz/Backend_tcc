import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface ListUserId {
  id?: string;
}

class ListUserIdService {
  async execute({ id }: ListUserId) {
    if (!id) return;

    try {
      const users = await prismaClient.usuarios.findUnique({
        where: { id_usuario: id },
        include: {
          tipousuario: {
            select: {
              id_tipousuario: true,
              nome_tipousuario: true,
            },
          },
          penalidades: {
            select: {
              id_penalidade: true,
              dataInicio_penalidade: true,
              dataFim_penalidade: true,
              perder_credibilidade: true,
              descricao: true,
              ativa: true,
              denuncias: {
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
      // Se for erro de coluna ausente (migração pendente)
      if (
        err instanceof PrismaClientKnownRequestError &&
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

      // Repassa o erro pro controller
      throw err;
    }
  }
}

export { ListUserIdService };
