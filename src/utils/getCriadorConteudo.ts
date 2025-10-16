import prismaClient from "../prisma";

/**
 * Retorna o usuário dono de um conteúdo denunciado
 */
export async function getCriadorConteudo(tipoConteudo: string, idConteudo: string) {
  let conteudo;
  
  switch (tipoConteudo) {
    case "Pergunta":
      conteudo = await prismaClient.pergunta.findUnique({
        where: { id_pergunta: idConteudo },
        select: { fkId_usuario: true },
      });
      break;

    case "Resposta":
      conteudo = await prismaClient.resposta.findUnique({
        where: { id_resposta: idConteudo },
        select: { fkId_usuario: true },
      });
      break;

    default:
      throw new Error(`Tipo de conteúdo "${tipoConteudo}" não suportado.`);
  }

  if (!conteudo) throw new Error("Conteúdo denunciado não encontrado");

  // Retorna o usuário dono do conteúdo
  const usuario = await prismaClient.usuarios.findUnique({
    where: { id_usuario: conteudo.fkId_usuario },
    select: {
      id_usuario: true,
      nome_usuario: true,
      apelido_usuario: true,
      credibilidade_usuario: true,
    },
  });

  if (!usuario) throw new Error("Usuário dono do conteúdo não encontrado");

  return usuario;
}
