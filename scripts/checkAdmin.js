const fs = require('fs');
const path = require('path');

function loadEnv(envPath) {
  try {
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^\s*([^#=]+?)\s*=\s*(.*)?\s*$/);
      if (!m) return;
      const key = m[1].trim();
      let val = m[2] ?? '';
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    });
  } catch (err) {
    // ignore
  }
}

loadEnv(path.join(process.cwd(), '.env'));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'lilvhx@etec.sp.gov.br';
  const user = await prisma.usuarios.findUnique({
    where: { email_usuario: email },
    include: { tipousuario: true },
  });

  if (!user) {
    console.log('Usuário não encontrado com o email:', email);
  } else {
    // Print selected fields
    const out = {
      id: user.id_usuario,
      nome: user.nome_usuario,
      apelido: user.apelido_usuario,
      email: user.email_usuario,
      tipo: user.tipousuario ? user.tipousuario.nome_tipousuario : null,
      credibilidade: user.credibilidade_usuario,
      criadoEm: user.dataCriacao_usuario,
    };
    console.log('Usuário encontrado:');
    console.log(out);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Erro ao buscar usuário:', e);
  prisma.$disconnect();
  process.exit(1);
});
