import prismaClient from "../../prisma";

interface CreateDenunciaProps {
  fkId_usuario: string;
  fkId_conteudo_denunciado: string;
  nivel_denuncia: number;
  tipo_conteudo:string;
  resultado: string;
  descricao: string;
}

class CreateDenunciaService {
  async execute({
    fkId_usuario,
    fkId_conteudo_denunciado,
    tipo_conteudo,
    nivel_denuncia,
    resultado,
    descricao
  }: CreateDenunciaProps) {

    // Verificar se o usuário existe
    const userExists = await prismaClient.usuarios.findUnique({
      where: { id_usuario: fkId_usuario }
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    
    const denuncia = await prismaClient.denuncias.create({
      data: {
        fkId_usuario,
        fkId_conteudo_denunciado,
        nivel_denuncia,
        resultado,
        status: "pendente",
        descricao,
        tipo_conteudo
      },
      include: {
        usuario: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          }
        }
      },
    });

    return denuncia;
  }
}

export { CreateDenunciaService };
