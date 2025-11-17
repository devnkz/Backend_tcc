import prismaClient from "../../prisma";
import { randomUUID } from "crypto";

interface CreateDenunciaProps {
  fkId_usuario: string;
  fkId_conteudo_denunciado: string;
  fkId_usuario_conteudo: string;
  tipo_denuncia?: string;
  nivel_denuncia: number;
  tipo_conteudo:string;
  resultado: string;
  descricao: string;
}

class CreateDenunciaService {
  async execute({
    fkId_usuario,
    fkId_conteudo_denunciado,
    fkId_usuario_conteudo,
    tipo_denuncia,
    tipo_conteudo,
    nivel_denuncia,
    resultado,
    descricao
  }: CreateDenunciaProps) {

    // Verificar se o usuário existe
    const userExists = await prismaClient.usuarios.findUnique({
      where: { id_usuario: fkId_usuario }
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    // Validação simples para tipo_denuncia (manter como string no modelo)
    // Esta lista contém as chaves usadas pelo frontend (modal de denúncia).
    // Se quiser adicionar/remover tipos, edite esta lista para corresponder
    // às `key` definidas em `modalCreateReport/index.tsx`.
    const allowedTipos = [
      "ameaca",
      "assedio",
      "desinformacao",
      "conteudo_sensivel",
      "fraude",
      "impersonificacao",
      "nazismo",
      "pornografia",
      "racismo",
      "spam",
      "violacao_ip",
      "xenofobia",
      "outro",
    ];
    if (tipo_denuncia) {
      const t = String(tipo_denuncia).toLowerCase().trim();
      if (!allowedTipos.includes(t)) {
        throw new Error(`Tipo de denúncia inválido: ${tipo_denuncia}. Permitidos: ${allowedTipos.join(", ")}`);
      }
      tipo_denuncia = t;
    }
    
    const denuncia = await prismaClient.denuncias.create({
      data: {
        id_denuncia: randomUUID(),
        fkId_usuario,
        fkId_conteudo_denunciado,
        fkId_usuario_conteudo,
        tipo_denuncia,
        nivel_denuncia,
        resultado,
        status: "pendente",
        descricao,
        tipo_conteudo
      },
      include: {
        usuarios: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          }
        }
      },
    });

    return denuncia;
  }
}

export { CreateDenunciaService };
