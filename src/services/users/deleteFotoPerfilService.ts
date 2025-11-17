import prismaClient from "../../prisma";
import fs from "fs";
import path from "path";

interface DeleteFotoPerfilRequest {
  id: string;
}

// Serviço responsável por remover a foto de perfil: seta campo como null
// e tenta remover o arquivo físico se existir.
export class DeleteFotoPerfilService {
  async execute({ id }: DeleteFotoPerfilRequest) {
    // Primeiro busca usuário para recuperar nome da imagem atual
    const usuario = await prismaClient.usuarios.findUnique({
      where: { id_usuario: id },
      select: { foto_perfil: true }
    });

    // Atualiza foto_perfil para null
    const updated = await prismaClient.usuarios.update({
      where: { id_usuario: id },
      data: { foto_perfil: null },
      include: { tipousuario: true }
    });

    // Remove arquivo físico se possível (ignore erros silenciosamente)
    if (usuario?.foto_perfil) {
      try {
        // foto_perfil salva como URL completa ex: http://localhost:3333/uploads/<nome>
        const fileName = usuario.foto_perfil.split("/uploads/").pop();
        if (fileName) {
          const filePath = path.resolve(__dirname, "..", "..", "uploads", fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      } catch (err) {
        // Log básico, mas não bloqueia operação.
        console.error("Erro ao remover arquivo de foto_perfil:", err);
      }
    }

    return updated;
  }
}
