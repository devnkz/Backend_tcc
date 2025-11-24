import prismaClient from "../../prisma";

class ListDenunciaService {
    async execute() { 
        const denuncias = await prismaClient.denuncias.findMany({
            include: {
                usuarios: {
                    select: {
                        id_usuario: true,
                        nome_usuario: true,
                        apelido_usuario: true,
                        credibilidade_usuario: true,
                    },
                },
                penalidades: {
                    select: {
                        id_penalidade: true,
                        dataInicio_penalidade: true,
                        dataFim_penalidade: true,
                        perder_credibilidade: true,
                        descricao: true,
                        ativa: true,
                    },
                },
            },
        })

        // Resolve texto do item denunciado (pergunta ou resposta) for each denúncia
        const resolved = await Promise.all(
            denuncias.map(async (d: any) => {
                let revisadoTipo: string | undefined = undefined;
                let item_denunciado: string | undefined = undefined;
                try {
                    const tipo = (d.tipo_conteudo || "").toLowerCase();
                    if (tipo.includes("perg")) {
                        const p = await prismaClient.pergunta.findUnique({
                            where: { id_pergunta: d.fkId_conteudo_denunciado },
                            select: { pergunta: true },
                        });
                        if (p) {
                            revisadoTipo = "Pergunta";
                            item_denunciado = p.pergunta;
                        }
                    } else if (tipo.includes("resp") || tipo.includes("resposta")) {
                        const r = await prismaClient.resposta.findUnique({
                            where: { id_resposta: d.fkId_conteudo_denunciado },
                            select: { resposta: true },
                        });
                        if (r) {
                            revisadoTipo = "Resposta";
                            item_denunciado = r.resposta;
                        }
                    }
                } catch (e) {
                    // ignore resolution errors - best effort
                }

                return {
                    ...d,
                    revisadoTipo,
                    item_denunciado,
                };
            })
        );

        return resolved;
    }
}

export { ListDenunciaService };
