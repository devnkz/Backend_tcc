import prismaClient from "../../prisma";

interface CreateTipoUsuarioProps {
  nome: string;
}


class createTipoUsuarioService {
  async execute({ nome } : CreateTipoUsuarioProps) {
    
    if (!nome) {
      throw new Error("Informacoes faltando");
    }

    const TipoUsuario = await prismaClient.tipoUsuario.create({
      data: {
       nome,
      },
    });

    return TipoUsuario;
  }
}


export { createTipoUsuarioService };