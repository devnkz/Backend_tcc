import prismaClient from "../../prisma"

interface DeletePerguntaProps {
  id: string
  deleteUser: string
}

class DeletePerguntaService {
  async execute({ id, deleteUser }: DeletePerguntaProps) {
    if (!id) {
      throw new Error("Id não foi enviado")
    }

    if (!deleteUser) {
      throw new Error(`Usuário não autenticado. Detalhes: ${deleteUser}`)
    }

    // busca a pergunta no banco
    const findPergunta = await prismaClient.pergunta.findFirst({
      where: { id }
    })

    if (!findPergunta) {
      throw new Error("Pergunta não existe")
    }

    // verifica se o dono é o mesmo que está tentando deletar
    if (findPergunta.userId !== deleteUser) {
      throw new Error(
        `Usuário sem permissão. deleteUser: ${deleteUser}, dono: ${findPergunta.userId}`
      )
    }

    // deleta a pergunta
    await prismaClient.pergunta.delete({
      where: { id: findPergunta.id }
    })

    return { message: "Deletado com sucesso!" }
  }
}

export { DeletePerguntaService }
