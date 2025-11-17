import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

function normalizeApelido(s: string) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function loadDotenvFile() {
  try {
    const dotenvPath = path.resolve(process.cwd(), ".env");
    if (!fs.existsSync(dotenvPath)) return;
    const content = fs.readFileSync(dotenvPath, "utf8");
    content.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*)?\s*$/);
      if (!match) return;
      const key = match[1].trim();
      let value = match[2] ?? "";
      // remove optional surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    });
  } catch (err) {
    // ignore dotenv load errors
  }
}

async function main() {
  loadDotenvFile();
  try {
    const nome = process.env.ADMIN_NOME || "Administrador";
    const apelidoRaw = process.env.ADMIN_APELIDO || "admin";
    const email = process.env.ADMIN_EMAIL || "admin@etec.sp.gov.br";
    const senha = process.env.ADMIN_SENHA || "Admin@12345";

    // find or create Admin tipo (case-insensitive check without using `mode`)
    let tipo = await prisma.tipousuario.findFirst({
      where: {
        nome_tipousuario: {
          in: [
            "Admin",
            "admin",
            "ADMIN",
            "Administrador",
            "administrador",
          ],
        },
      },
    });
    if (!tipo) {
      tipo = await prisma.tipousuario.create({ data: { id_tipousuario: randomUUID(), nome_tipousuario: "Admin" } });
      console.log("Tipo 'Admin' criado com id:", tipo.id_tipousuario);
    } else {
      console.log("Tipo 'Admin' encontrado com id:", tipo.id_tipousuario);
    }

    const apelido = normalizeApelido(apelidoRaw);

    // check if user already exists by email or apelido
    const userByEmail = await prisma.usuarios.findUnique({ where: { email_usuario: email } });
    const userByApelido = await prisma.usuarios.findFirst({ where: { apelido_usuario: apelido } });

    if (userByEmail || userByApelido) {
      console.log("Usuário com esse e-mail ou apelido já existe. Preparando atualização para admin.");

      // If both exist but belong to different users, abort to avoid unique conflicts
      if (userByEmail && userByApelido && userByEmail.id_usuario !== userByApelido.id_usuario) {
        console.error(
          "Conflito detectado: o e-mail informado pertence a um usuário diferente do apelido informado.\n" +
            "Resolva manualmente no banco de dados ou escolha outro e-mail/apelido."
        );
        process.exitCode = 1;
        return;
      }

      // Choose the target user (either one that matches email or apelido)
      const target = userByEmail || userByApelido;
      console.log("Atualizando usuário existente (id):", target?.id_usuario);

      const hashed = await bcrypt.hash(senha, 10);
      const updated = await prisma.usuarios.update({
        where: { id_usuario: target!.id_usuario },
        data: {
          nome_usuario: nome,
          apelido_usuario: apelido,
          email_usuario: email,
          senha_usuario: hashed,
          fkIdTipoUsuario: tipo.id_tipousuario,
          credibilidade_usuario: 100,
        },
      });
      console.log("Usuário atualizado:", updated.id_usuario);
      return;
    }

    const hashed = await bcrypt.hash(senha, 10);

    const user = await prisma.usuarios.create({
      data: {
        id_usuario: randomUUID(),
        nome_usuario: nome,
        apelido_usuario: apelido,
        email_usuario: email,
        senha_usuario: hashed,
        fkIdTipoUsuario: tipo.id_tipousuario,
        credibilidade_usuario: 100,
      },
    });

    console.log("Usuário admin criado com id:", user.id_usuario);
  } catch (e) {
    console.error("Erro ao criar admin:", e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
