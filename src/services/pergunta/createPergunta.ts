import prismaClient from "../../prisma";

interface CreatePerguntaProps {
  fkId_usuario: string;
  pergunta: string;
  fkId_componente: string;
  fkId_curso: string;
}

class CreatePerguntaService {
  async execute({ fkId_usuario, pergunta, fkId_componente, fkId_curso }: CreatePerguntaProps) {
    if (!fkId_usuario || !pergunta || !fkId_componente || !fkId_curso) {
      throw new Error("Informações faltando");
    }

    const perguntaCriada = await prismaClient.pergunta.create({
      data: {
        fkId_usuario,
        pergunta,
        fkId_componente,
        fkId_curso
      },
      include: {
        usuario: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
        componente: {
          select: {
            id_componente: true,
            nome_componente: true,
          },
        },
        curso: {
          select: {
            id_curso: true,
          }
        },
      },
    });

    return perguntaCriada;
  }
}

export { CreatePerguntaService };
