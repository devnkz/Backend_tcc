
import prismaClient from "../../prisma"

interface DeleteUserProps {
    id: string
}

class DeleteUserService {
    async execute({ id }: DeleteUserProps) {
        if (!id) {
            throw new Error("Id nao foi enviado")
        }

        const findUser = await prismaClient.usuarios.findUnique({
            where: { id_usuario: id },
            select: { id_usuario: true }
        })

        if (!findUser) {
            throw new Error("Usuario nao existe");
        }

        // Remoção segura de usuário e dependências em transação
        await prismaClient.$transaction(async (tx) => {
            // 0) Se o usuário criou grupos, limpar dependências e remover os grupos
            const gruposCriados = await tx.grupo.findMany({
                where: { fkId_usuario: id },
                select: { id_grupo: true },
            });
            if (gruposCriados.length > 0) {
                const groupIds = gruposCriados.map((g) => g.id_grupo);
                // Quebra vínculos de replies entre mensagens desses grupos
                await tx.mensagem.updateMany({
                    where: { fkId_grupo: { in: groupIds }, NOT: { replyToId: null } },
                    data: { replyToId: null },
                });
                // Remove mensagens dos grupos
                await tx.mensagem.deleteMany({ where: { fkId_grupo: { in: groupIds } } });
                // Remove membros dos grupos
                await tx.membro.deleteMany({ where: { fkId_grupo: { in: groupIds } } });
                // Remove os grupos
                await tx.grupo.deleteMany({ where: { id_grupo: { in: groupIds } } });
            }

            // 1) Mensagens do usuário: primeiro limpar replies que apontam para elas
            const mensagensDoUsuario = await tx.mensagem.findMany({
                where: { fkId_usuario: id },
                select: { id_mensagem: true },
            });
            if (mensagensDoUsuario.length > 0) {
                const msgIds = mensagensDoUsuario.map((m) => m.id_mensagem);
                await tx.mensagem.updateMany({
                    where: { replyToId: { in: msgIds } },
                    data: { replyToId: null },
                });
            }
            await tx.mensagem.deleteMany({ where: { fkId_usuario: id } });

            // 2) Sair de grupos (membros)
            await tx.membro.deleteMany({ where: { fkId_usuario: id } });

            // 3) Respostas do usuário
            await tx.resposta.deleteMany({ where: { fkId_usuario: id } });

            // 4) Perguntas do usuário (cascateia respostas ligadas a estas perguntas)
            await tx.pergunta.deleteMany({ where: { fkId_usuario: id } });

            // 5) Penalidades aplicadas ao usuário
            await tx.penalidades.deleteMany({ where: { fkId_usuario: id } });

            // 6) Denúncias feitas pelo usuário
            await tx.denuncias.deleteMany({ where: { fkId_usuario: id } });

            // 7) Finalmente, remove o usuário
            await tx.usuarios.delete({ where: { id_usuario: id } });
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeleteUserService }