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

    // Enforce ETEC email domain for registrations
    const emailTrimmed = String(email_usuario).trim();
    const isEtec = /@etec\.sp\.gov\.br$/i.test(emailTrimmed);
    if (!isEtec) {
      throw {
        status: 400,
        message:
          "É necessário utilizar um e‑mail institucional da ETEC (@etec.sp.gov.br).",
      };
    }

    const nomeValidado = validarTextoOuErro(nome_usuario);
    // validate apelido format: only letters, numbers, dot and underscore, min 3
    const apelidoTrim = String(apelido_usuario).trim();
        if (!/^(?=.{3,}$)[A-Za-z0-9](?:[A-Za-z0-9._]*[A-Za-z0-9])$/.test(apelidoTrim)) {
          if (/[._]$/.test(apelidoTrim)) {
            throw { status: 400, message: "Apelido inválido: não pode terminar com '.' ou '_' ." };
          }
          throw { status: 400, message: "Apelido inválido. Use letras, números, '.' ou '_' sem espaços (mínimo 3 caracteres)." };
        }

    // normalize apelido for uniqueness & storage
    const normalize = (s: string) =>
      String(s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
    const apelidoNormalized = normalize(apelidoTrim);

    // check uniqueness using normalized form
    const existingApelido = await prismaClient.usuarios.findFirst({ where: { apelido_usuario: apelidoNormalized } });
    if (existingApelido) {
      throw { status: 409, message: "Este apelido já está em uso por outro usuário." };
    }

    const apelidoValidado = validarTextoOuErro(apelidoTrim);
    const hashedPassword = await bcrypt.hash(senha_usuario, 10);

    try {
      const user = await prismaClient.usuarios.create({
          data: {
              nome_usuario: nomeValidado.textoFiltrado,
              // store normalized apelido to keep uniqueness checks consistent
              apelido_usuario: apelidoNormalized,
              email_usuario: emailTrimmed,
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
