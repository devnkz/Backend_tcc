import prismaClient from './src/prisma/index';

async function checkTipos() {
  try {
    const tipos = await prismaClient.tipoUsuario.findMany({
      select: {
        id_tipousuario: true,
        nome_tipousuario: true,
        _count: {
          select: {
            users: true
          }
        }
      }
    });
    
    console.log('\n=== TIPOS DE USUÁRIO NO BANCO ===');
    tipos.forEach(t => {
      console.log(`- ${t.nome_tipousuario} (ID: ${t.id_tipousuario}) - ${t._count.users} usuários`);
    });
    console.log('=================================\n');
    
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prismaClient.$disconnect();
  }
}

checkTipos();
