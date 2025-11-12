import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";

interface UpdateGrupoProps {
  id: string;
  nome_grupo?: string;
  novosMembrosIds?: string[];
}

class updateGrupoService {
  async execute({ id, nome_grupo, novosMembrosIds }: UpdateGrupoProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }
    const MSG_IMPROPRIO =
      "Conteúdo impróprio detectado. Remova palavras ofensivas antes de enviar.";

    // Validação unificada: vazio ou detectado como impróprio retorna mesma mensagem
    let nomeFiltrado: string | undefined = undefined;
    if (typeof nome_grupo === "string") {
      const raw = nome_grupo.trim();
      if (raw.length === 0) {
        throw new Error(MSG_IMPROPRIO);
      }
      try {
        nomeFiltrado = validarTextoOuErro(raw).textoFiltrado;
      } catch {
        // Mesmo se não for exatamente uma "badword", mantenha a mensagem padronizada
        throw new Error(MSG_IMPROPRIO);
      }
    }

    const grupoAtualizado = await prismaClient.grupo.update({
      where: { id_grupo: id },
      data: {
        // aplica nome filtrado somente se enviado
        nome_grupo: nomeFiltrado,
        membros: novosMembrosIds
          ? {
              create: novosMembrosIds.map((userId) => ({ 
                fkId_usuario: userId 
              })),
            }
          : undefined,
      },
      include: {
        membros: { 
          include: { 
            usuario: true 
          } 
        },
        usuario: true,
      },
    });

    return grupoAtualizado;
  }
}

export { updateGrupoService };
