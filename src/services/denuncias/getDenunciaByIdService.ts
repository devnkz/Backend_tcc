import prismaClient from "../../prisma";

export class GetDenunciaByIdService {
  async execute(id_denuncia: string) {
    const denuncia = await prismaClient.denuncias.findUnique({
      where: { id_denuncia },
      include: {
        usuarios: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
            credibilidade_usuario: true,
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
          },
        },
      },
    });

    if (!denuncia) return null;

    // try to resolve the user object for the content owner (denunciado)
    let denunciadoUsuario = null;
    if (denuncia.fkId_usuario_conteudo) {
      denunciadoUsuario = await prismaClient.usuarios.findUnique({
        where: { id_usuario: denuncia.fkId_usuario_conteudo },
        select: { id_usuario: true, nome_usuario: true, apelido_usuario: true },
      });
    }

    // Normalize response to match frontend expectations: provide `usuario` (reporter)
    // and `denunciadoUsuario`/`denunciadoNome` for easy consumption.
    // try to resolve the item text (pergunta/resposta) so front-end can show "item denunciado"
    let revisadoTipo: string | undefined = undefined;
    let itemDenunciadoText: string | undefined = undefined;
    try {
      const tipo = (denuncia.tipo_conteudo || "").toLowerCase();
      if (tipo.includes("perg")) {
        const p = await prismaClient.pergunta.findUnique({
          where: { id_pergunta: denuncia.fkId_conteudo_denunciado },
          select: { pergunta: true },
        });
        if (p) {
          revisadoTipo = "Pergunta";
          itemDenunciadoText = p.pergunta;
        }
      } else if (tipo.includes("resp") || tipo.includes("resposta")) {
        const r = await prismaClient.resposta.findUnique({
          where: { id_resposta: denuncia.fkId_conteudo_denunciado },
          select: { resposta: true },
        });
        if (r) {
          revisadoTipo = "Resposta";
          itemDenunciadoText = r.resposta;
        }
      }
    } catch (e) {
      // best-effort, ignore
    }

    const normalized = {
      ...denuncia,
      usuario: denuncia.usuarios,
      denunciadoUsuario,
      denunciadoNome:
        denunciadoUsuario
          ? `${denunciadoUsuario.nome_usuario}${denunciadoUsuario.apelido_usuario ? ` (${denunciadoUsuario.apelido_usuario})` : ""}`
          : undefined,
      revisadoTipo,
      item_denunciado: itemDenunciadoText,
    } as any;

    return normalized;
  }
}
