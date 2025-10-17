import prismaClient from "../../prisma";

interface ListUserId {
  id?: string;
}

class ListUserIdService {
  async execute({ id }: ListUserId) {
    if (id) {
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
    }
  }
}

export { ListUserIdService };
