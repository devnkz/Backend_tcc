import prismaClient from "../../prisma";

interface CreatePenalidadeProps {
  fkId_usuario: string;
  fkId_denuncia: string;
  banimento?: string;
  perder_credibilidade: string;
  descricao: string;
}

class CreatePenalidadeService {
  async execute({
    fkId_usuario,
    fkId_denuncia,
    banimento,
    perder_credibilidade,
    descricao
  }: CreatePenalidadeProps) {
    if (!fkId_usuario || !fkId_denuncia || !perder_credibilidade || !descricao) {
      throw new Error("Informações faltando");
    }

    // Verificar se o usuário existe
    const userExists = await prismaClient.usuarios.findUnique({
      where: { id_usuario: fkId_usuario }
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar se a denúncia existe
    const denunciaExists = await prismaClient.denuncias.findUnique({
      where: { id_denuncia: fkId_denuncia }
    });

    if (!denunciaExists) {
      throw new Error("Denúncia não encontrada");
    }

    // Verificar se já existe uma penalidade para esta denúncia
    const existingPenalidade = await prismaClient.penalidades.findUnique({
      where: { fkId_denuncia: fkId_denuncia }
    });

    if (existingPenalidade) {
      throw new Error("Já existe uma penalidade para esta denúncia");
    }

    // Criar penalidade
    const penalidade = await prismaClient.penalidades.create({
      data: {
        fkId_usuario,
        fkId_denuncia,
        banimento,
        perder_credibilidade,
        descricao,
        ativa: true
      },
      include: {
        usuario: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          }
        },
        denuncia: {
          select: {
            id_denuncia: true,
            nivel_denuncia: true,
            status: true,
            resultado: true,
          }
        }
      },
    });

    return penalidade;
  }
}

export { CreatePenalidadeService };
