import prismaClient from "../../prisma";

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

    const [penalidade] = await prismaClient.$transaction([

      // 1) Criar penalidade
      prismaClient.penalidades.create({
        data: {
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
          fkId_usuario: autorDenuncia,
          titulo: "Denúncia concluída",
          mensagem: `A denúncia que você realizou foi analisada e resultou em uma penalidade para o usuário.`,
          tipo: "Denuncia_concluida",
          lida: false
        }
      })
    ]);

    return penalidade;
  }
}

export { CreatePenalidadeService };
