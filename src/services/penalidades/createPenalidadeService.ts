import prismaClient from "../../prisma";
import { randomUUID } from "crypto";

interface CreatePenalidadeProps {
  fkId_usuario: string;
  fkId_denuncia: string;
  dataInicio_penalidade: Date;
  dataFim_penalidade: Date;
  perder_credibilidade: number;
  descricao: string;
}

class CreatePenalidadeService {
  async execute({
    fkId_usuario,
    fkId_denuncia,
    dataInicio_penalidade,
    dataFim_penalidade,
    perder_credibilidade,
    descricao
  }: CreatePenalidadeProps) {

    if (!fkId_usuario || !fkId_denuncia || !perder_credibilidade || !descricao) {
      throw new Error("Informações faltando");
    }

    const userExists = await prismaClient.usuarios.findUnique({
      where: { id_usuario: fkId_usuario }
    });
    if (!userExists) throw new Error("Usuário não encontrado");

    const denunciaExists = await prismaClient.denuncias.findUnique({
      where: { id_denuncia: fkId_denuncia }
    });
    if (!denunciaExists) throw new Error("Denúncia não encontrada");

    const existingPenalidade = await prismaClient.penalidades.findUnique({
      where: { fkId_denuncia: fkId_denuncia }
    });
    if (existingPenalidade) throw new Error("Já existe uma penalidade para esta denúncia");

    // 🔥 ID do usuário que realizou a denúncia
    const autorDenuncia = denunciaExists.fkId_usuario;

    // try to resolve the denunciado name and the content text so the notification
    // includes human-readable data even if the frontend didn't pass it
    let denunciadoNomeResolved: string | undefined = undefined;
    if (denunciaExists.fkId_usuario_conteudo) {
      const u = await prismaClient.usuarios.findUnique({
        where: { id_usuario: denunciaExists.fkId_usuario_conteudo },
        select: { nome_usuario: true, apelido_usuario: true },
      });
      if (u) {
        denunciadoNomeResolved = `${u.nome_usuario ?? ""}${
          u.apelido_usuario ? ` (${u.apelido_usuario})` : ""
        }`;
      }
    }

    let itemDenunciadoResolved: string | undefined = undefined;
    try {
      const tipo = (denunciaExists.tipo_conteudo || "").toLowerCase();
      if (tipo.includes("perg")) {
        const p = await prismaClient.pergunta.findUnique({
          where: { id_pergunta: denunciaExists.fkId_conteudo_denunciado },
          select: { pergunta: true },
        });
        if (p) itemDenunciadoResolved = p.pergunta;
      } else if (tipo.includes("resp") || tipo.includes("resposta")) {
        const r = await prismaClient.resposta.findUnique({
          where: { id_resposta: denunciaExists.fkId_conteudo_denunciado },
          select: { resposta: true },
        });
        if (r) itemDenunciadoResolved = r.resposta;
      }
    } catch (e) {
      // ignore resolution errors, it's best-effort
    }

    const [penalidade] = await prismaClient.$transaction([

      // 1) Criar penalidade
      prismaClient.penalidades.create({
        data: {
          id_penalidade: randomUUID(),
          fkId_usuario,
          fkId_denuncia,
          perder_credibilidade,
          dataInicio_penalidade,
          dataFim_penalidade,
          descricao,
          ativa: true
        }
      }),

      // 2) Atualizar credibilidade do usuário penalizado
      prismaClient.usuarios.update({
        where: { id_usuario: fkId_usuario },
        data: {
          credibilidade_usuario: {
            decrement: perder_credibilidade,
          }
        }
      }),

      // 3) Atualizar status da denúncia
      prismaClient.denuncias.update({
        where: { id_denuncia: fkId_denuncia },
        data: { status: "concluido" }
      }),

      // 4) Criar notificação para o usuário que FEZ a denúncia
      prismaClient.notificacoes.create({
        data: {
          id_notificacao: randomUUID(),
          fkId_usuario: autorDenuncia,
          titulo: "Denúncia concluída",
          mensagem:
            `A denúncia que você realizou foi analisada e resultou em uma penalidade para o usuário.`,
          tipo: "denuncia",
          lida: false,
          fkId_denuncia: fkId_denuncia,
        }
      })
    ]);

    return penalidade;
  }
}

export { CreatePenalidadeService };
