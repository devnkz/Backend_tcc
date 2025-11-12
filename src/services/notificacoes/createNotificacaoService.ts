import prismaClient from "../../prisma";

interface CreateNotificacaoProps {
  fkId_usuario: string;
  titulo: string;
  mensagem: string;
  tipo: string; // e.g., "denuncia"
}

export class CreateNotificacaoService {
  async execute({ fkId_usuario, titulo, mensagem, tipo }: CreateNotificacaoProps) {
    const created = await prismaClient.notificacoes.create({
      data: { fkId_usuario, titulo, mensagem, tipo },
    });
    return created;
  }
}
