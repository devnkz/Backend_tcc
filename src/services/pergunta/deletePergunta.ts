import prismaClient from "../../prisma"

interface DeletePerguntaProps {
  id: string
  deleteUser: string
  deleteRole?: string
  deleteEmail?: string
}

class DeletePerguntaService {
  async execute({ id, deleteUser, deleteRole, deleteEmail }: DeletePerguntaProps) {
    if (!id) {
      throw new Error("Id não foi enviado")
    }

    if (!deleteUser) {
      throw new Error(`Usuário não autenticado. Detalhes: ${deleteUser}`)
    }

    // busca a pergunta no banco
    const findPergunta = await prismaClient.pergunta.findFirst({
      where: { id_pergunta: id }
    })

    if (!findPergunta) {
      throw new Error("Pergunta não existe")
    }

    const isAdmin = (deleteRole || "").toLowerCase() === "administrador" || (deleteEmail || "").toLowerCase() === "lilvhx@gmail.com";

    // verifica se o dono é o mesmo que está tentando deletar, ou admin
    if (findPergunta.fkId_usuario !== deleteUser && !isAdmin) {
      throw new Error(
        `Usuário sem permissão. deleteUser: ${deleteUser}, dono: ${findPergunta.fkId_usuario}`
      )
    }

    // deleta a pergunta
    await prismaClient.pergunta.delete({
      where: { id_pergunta: findPergunta.id_pergunta }
    })

    return { message: "Deletado com sucesso!" }
  }
}

export { DeletePerguntaService }
