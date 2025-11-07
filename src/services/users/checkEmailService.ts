import prismaClient from "../../prisma";

class CheckEmailService {
  async execute(email: string) {
    const user = await prismaClient.usuarios.findFirst({
      where: { email_usuario: email },
      select: { id_usuario: true },
    });

    return { exists: !!user };
  }
}

export { CheckEmailService };
