const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');

const prisma = new PrismaClient();

async function main() {
  const email = 'contatoaraujo.ds@gmail.com';
  console.log(`Updating user ${email} to Admin role...`);

  // Find or create Admin tipousuario
  let adminTipo = await prisma.tipousuario.findFirst({
    where: { nome_tipousuario: { in: ['admin', 'Admin', 'ADMIN'] } },
  });

  if (!adminTipo) {
    console.log('Admin role not found, creating it.');
    adminTipo = await prisma.tipousuario.create({
      data: { id_tipousuario: randomUUID(), nome_tipousuario: 'Admin' },
    });
  }

  const user = await prisma.usuarios.findUnique({ where: { email_usuario: email } });
  if (!user) {
    console.error(`User with email ${email} not found.`);
    process.exit(1);
  }

  await prisma.usuarios.update({
    where: { email_usuario: email },
    data: { fkIdTipoUsuario: adminTipo.id_tipousuario },
  });

  console.log(`User ${email} updated to Admin (id: ${adminTipo.id_tipousuario}).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
