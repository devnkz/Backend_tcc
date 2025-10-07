import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";

interface CreateTipoUsuarioProps {
  nome_tipousuario: string;
}

class createTipoUsuarioService {
  async execute({ nome_tipousuario } : CreateTipoUsuarioProps) {
    
    if (!nome_tipousuario) {
      throw new Error("Informacoes faltando");
    }

    const nomeValidado = validarTextoOuErro(nome_tipousuario);

    const TipoUsuario = await prismaClient.tipoUsuario.create({
      data: {
       nome_tipousuario: nomeValidado.textoFiltrado,
      },
    });

    return TipoUsuario;
  }
}


export { createTipoUsuarioService };