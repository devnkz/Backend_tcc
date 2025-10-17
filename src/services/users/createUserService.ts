import prismaClient from "../../prisma";
import bcrypt from "bcrypt";
import { validarTextoOuErro } from "../../utils/filterText";

interface CreateUserProps {
  nome_usuario: string;
  apelido_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  fkIdTipoUsuario?: string;
  credibilidade_usuario?: number;
}

class CreateUserService {
  async execute({
    nome_usuario,
    apelido_usuario,
    email_usuario,
    senha_usuario,
    fkIdTipoUsuario = "dcf9817e-9d57-4f68-9b29-eb5ca87ee26c",
    credibilidade_usuario = 46,
  }: CreateUserProps) {
    if (!nome_usuario || !apelido_usuario || !email_usuario || !senha_usuario || !fkIdTipoUsuario) {
      throw { status: 400, message: "Informações faltando" };
    }

    const nomeValidado = validarTextoOuErro(nome_usuario);
    const apelidoValidado = validarTextoOuErro(apelido_usuario);
    const hashedPassword = await bcrypt.hash(senha_usuario, 10);

    try {
      const user = await prismaClient.usuarios.create({
        data: {
          nome_usuario: nomeValidado.textoFiltrado,
          apelido_usuario: apelidoValidado.textoFiltrado,
          email_usuario,
          senha_usuario: hashedPassword,
          fkIdTipoUsuario,
          credibilidade_usuario,
        },
        include: { tipoUsuario: true },
      });

      return user;

    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email_usuario")) {
        throw { status: 409, message: "Este e-mail já está cadastrado em outra conta." };
      }

      throw { status: 400, message: error.message || "Erro ao criar usuário." };
    }
  }
}

export { CreateUserService };
