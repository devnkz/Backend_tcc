import  prisma  from "../prisma";

export class ValidarRespostaService {
  async executar(id_resposta: string, id_usuario_validador: string) {
    // 1. Verificar se a resposta existe
    const resposta = await prisma.resposta.findUnique({
      where: { id_resposta },
      include: { usuarios: true }
    });

    if (!resposta) {
      throw new Error("Resposta não encontrada.");
    }

    // Impedir validar a própria resposta
    if (resposta.usuarios.id_usuario === id_usuario_validador) {
      throw new Error("Você não pode validar sua própria resposta.");
    }

    // 2. Atualizar status da resposta
    await prisma.resposta.update({
      where: { id_resposta },
      data: { status_resposta: "Validada" }
    });

    // 3. Aumentar credibilidade do autor da resposta
    await prisma.usuarios.update({
      where: { id_usuario: resposta.usuarios.id_usuario },
      data: {
        credibilidade_usuario: {
          increment: 10
        }
      }
    });

    // 4. Atualizar progresso da conquista “Mente Eclética”
    const tituloConquista = "Mente Eclética";

    // Buscar conquista
    const conquista = await prisma.conquista.findFirst({
      where: { titulo: tituloConquista }
    });

    if (!conquista) {
      throw new Error("Conquista não encontrada: " + tituloConquista);
    }
// Verificar progresso do usuário
let progresso = await prisma.progressoConquista.findFirst({
  where: {
    usuarioId: resposta.usuarios.id_usuario,
    conquistaId: conquista.id
  }
});

// Criar progresso se não existir
if (!progresso) {
  progresso = await prisma.progressoConquista.create({
    data: {
      usuarioId: resposta.usuarios.id_usuario,
      conquistaId: conquista.id,
      progresso: 0
    }
  });
}

// Incrementar progresso, respeitando o limite máximo
if (progresso.progresso < conquista.progressoMax) {
  await prisma.progressoConquista.update({
    where: { id: progresso.id },
    data: {
      progresso: {
        increment: 1
      }
    }
  });
}


    return { mensagem: "Resposta validada com sucesso." };
  }
}
