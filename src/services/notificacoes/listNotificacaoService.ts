import prismaClient from "../../prisma";

export class ListNotificacaoService {
  async executeByUser(fkId_usuario: string) {
    const list = await prismaClient.notificacoes.findMany({
      where: { fkId_usuario },
      orderBy: { dataCriacao_notificacao: "desc" },
    });
    return list;
  }
}
