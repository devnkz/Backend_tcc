import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Buscar o tipo admin
  const adminTipo = await prisma.tipousuario.findFirst({
    where: { 
      nome_tipousuario: { 
        in: ["admin", "Admin", "ADMIN", "administrador", "Administrador"] 
      } 
    },
  });

  if (!adminTipo) {
    console.error("❌ Tipo 'admin' não encontrado. Execute o seed primeiro.");
    return;
  }

  // Buscar o usuário pelo email
  const usuario = await prisma.usuarios.findUnique({
    where: { email_usuario: "lilvhx@gmail.com" },
    include: { tipousuario: true },
  });

  if (!usuario) {
    console.error("❌ Usuário lilvhx@gmail.com não encontrado.");
    return;
  }

  console.log("📋 Usuário encontrado:", {
    nome: usuario.nome_usuario,
    apelido: usuario.apelido_usuario,
    tipo_atual: usuario.tipousuario.nome_tipousuario,
  });

  // Atualizar para admin
  const atualizado = await prisma.usuarios.update({
    where: { id_usuario: usuario.id_usuario },
    data: { fkIdTipoUsuario: adminTipo.id_tipousuario },
    include: { tipousuario: true },
  });

  console.log("✅ Usuário atualizado com sucesso!");
  console.log("📋 Novo tipo:", atualizado.tipousuario.nome_tipousuario);
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
