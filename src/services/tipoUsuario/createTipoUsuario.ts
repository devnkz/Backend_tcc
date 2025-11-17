import prismaClient from "../../prisma";
import { randomUUID } from "crypto";
import { validarTextoOuErro } from "../../utils/filterText";

interface CreateTipoUsuarioProps {
  nome_tipousuario: string;
}

class createTipoUsuarioService {
  async execute({ nome_tipousuario } : CreateTipoUsuarioProps) {
    
    if (!nome_tipousuario) {
      throw new Error("Informacoes faltando");
    }

    // Normaliza entrada e aplica regras de negócio: apenas 3 tipos permitidos
    const entrada = validarTextoOuErro(nome_tipousuario).textoFiltrado.trim();
    const raw = entrada.toLowerCase();
    const mapCanon: Record<string, "aluno" | "professor" | "admin"> = {
      aluno: "aluno",
      estudantes: "aluno",
      estudante: "aluno",
      prof: "professor",
      professor: "professor",
      admin: "admin",
      adm: "admin",
      administrador: "admin",
    };
    const canonical = mapCanon[raw] || (raw as any);
    const label = canonical.charAt(0).toUpperCase() + canonical.slice(1);
    const allowed = new Set(["aluno", "professor", "admin"]);
    if (!allowed.has(canonical)) {
      throw new Error("Tipo de usuário inválido. Permitidos: aluno, professor, admin");
    }

    // Verificar se já existem 3 tipos cadastrados (limite)
    const total = await prismaClient.tipousuario.count();
    if (total >= 3) {
      // Permitir apenas se estiver tentando criar um que ainda não exista e substituir não é permitido aqui
      const exists = await prismaClient.tipousuario.findFirst({
        where: { nome_tipousuario: { in: [canonical, label] } },
      });
      if (exists) {
        return exists; // idempotente
      }
      throw new Error("Limite de tipos atingido. Apenas aluno, professor e admin são permitidos.");
    }

    // Evitar duplicidade por nome (case-insensitive)
    const existing = await prismaClient.tipousuario.findFirst({
      where: { nome_tipousuario: { in: [canonical, label] } },
    });
    if (existing) return existing;

    // Persistir com capitalização amigável
    // label variable already defined above
    const TipoUsuario = await prismaClient.tipousuario.create({
      data: {
        id_tipousuario: randomUUID(),
        nome_tipousuario: label,
      },
    });

    return TipoUsuario;
  }
}


export { createTipoUsuarioService };