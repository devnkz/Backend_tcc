import prismaClient from "../../prisma";

interface UpdateFotoPerfilRequest {
  id: string;
  url: string;
}

export class UpdateFotoPerfilService {
  async execute({ id, url }: UpdateFotoPerfilRequest) {
    const user = await prismaClient.user.update({
      where: { id },
      data: {
        fotoPerfil: url,
      },
    });

    return user;
  }
}
