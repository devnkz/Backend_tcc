import prismaClient from "../../prisma";

export class DeleteNotificacaoService {
  async execute({ id_notificacao }: { id_notificacao: string }) {
    const deleted = await prismaClient.notificacoes.delete({
      where: { id_notificacao }
    });

    return deleted;
  }
}
