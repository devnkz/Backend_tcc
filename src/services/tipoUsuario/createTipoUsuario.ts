import prismaClient from "../../prisma";

interface CreateTipoUsuarioProps {
  nome_tipousuario: string;
}

class createTipoUsuarioService {
  async execute({ nome_tipousuario } : CreateTipoUsuarioProps) {
    
    if (!nome_tipousuario) {
      throw new Error("Informacoes faltando");
    }

    const TipoUsuario = await prismaClient.tipoUsuario.create({
      data: {
       nome_tipousuario,
      },
    });

    return TipoUsuario;
  }
}


export { createTipoUsuarioService };