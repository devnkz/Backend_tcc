import prismaClient from "../../prisma";
import { randomUUID } from "crypto";

interface CreateNotificacaoProps {
  fkId_usuario: string;
  titulo: string;
  mensagem: string;
  tipo: string; // e.g., "denuncia"
  // optional denuncia-related fields
  fkId_denuncia?: string;
  fkId_conteudo_denunciado?: string;
  tipo_denuncia?: string;
  nivel_denuncia?: number;
  revisao?: string;
  dataRevisao?: Date | string;
  item_denunciado?: string;
  denunciadoNome?: string;
  fkId_usuario_conteudo?: string;
}

export class CreateNotificacaoService {
  async execute({
    fkId_usuario,
    titulo,
    mensagem,
    tipo,
    fkId_denuncia,
    fkId_conteudo_denunciado,
    tipo_denuncia,
    nivel_denuncia,
    revisao,
    dataRevisao,
    item_denunciado,
    denunciadoNome,
    fkId_usuario_conteudo,
  }: CreateNotificacaoProps) {
    // only include fields that exist in the current Prisma schema for `notificacoes`
    const payload: any = {
      id_notificacao: randomUUID(),
      fkId_usuario,
      titulo,
      mensagem,
      tipo,
    };

    // attach only the supported denuncia foreign key (fkId_denuncia) if provided
    if (fkId_denuncia) payload.fkId_denuncia = fkId_denuncia;

    const created = await prismaClient.notificacoes.create({ data: payload });
    return created;
  }
}
