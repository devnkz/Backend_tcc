import prismaClient from "../../prisma";

interface CreateTipoUsuarioProps {
  nomeTipoUsuario: string;
}


class createTipoUsuarioService {
  async execute({ nomeTipoUsuario } : CreateTipoUsuarioProps) {
    
    if (!nomeTipoUsuario) {
      throw new Error("Informacoes faltando");
    }

    const TipoUsuario = await prismaClient.tipousuario.create({
      data: {
       nomeTipoUsuario,
      },
    });

    return TipoUsuario;
  }
}


export { createTipoUsuarioService };