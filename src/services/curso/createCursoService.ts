import prismaClient from "../../prisma";
import { randomUUID } from "crypto";
import { validarTextoOuErro } from "../../utils/filterText";

interface CreateCursoProps {
  nome_curso: string;
}

class createCursoService {
  async execute({ nome_curso }: CreateCursoProps) {
    if (!nome_curso) {
      throw new Error("Nome do curso é obrigatório");
    }

    const nomeValidado = validarTextoOuErro(nome_curso);

    const curso = await prismaClient.curso.create({
      data: {
        id_curso: randomUUID(),
        nome_curso: nomeValidado.textoFiltrado,
      },
    });

    return curso;
  }
}

export { createCursoService }; 