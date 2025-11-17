import prismaClient from "../../prisma";

interface UpdateNotificacaoProps {
  id_notificacao: string;
  lida?: boolean;
}

export class UpdateNotificacaoService {
  async execute({ id_notificacao, lida }: UpdateNotificacaoProps) {
    const updated = await prismaClient.notificacoes.update({
      where: { id_notificacao },
      data: { lida },
    });
    return updated;
  }
}
