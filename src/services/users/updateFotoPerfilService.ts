import prismaClient from "../../prisma";

interface UpdateFotoPerfilRequest {
  id: string;
  foto_perfil: string;
}

export class UpdateFotoPerfilService {
  async execute({ id, foto_perfil }: UpdateFotoPerfilRequest) {
    const user = await prismaClient.usuarios.update({
      where: { id_usuario: id },
      data: {
        foto_perfil: foto_perfil,
      },
      include: {
        tipousuario: true
      }
    });

    return user;
  }
}
