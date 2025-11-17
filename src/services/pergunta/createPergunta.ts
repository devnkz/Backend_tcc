import prismaClient from "../../prisma";
import { validarTextoOuErro } from "../../utils/filterText";
import { randomUUID } from "crypto";

interface CreatePerguntaProps {
  fkId_usuario: string;
  pergunta: string;
  fkId_componente: string;
  fkId_curso: string;
}

class CreatePerguntaService {
  async execute({ fkId_usuario, pergunta, fkId_componente, fkId_curso }: CreatePerguntaProps) {
    // basic validation: ensure all fields present and pergunta is not empty/whitespace
    if (!fkId_usuario || !pergunta || !fkId_componente || !fkId_curso) {
      const err = new Error("Informações faltando");
      err.name = "ValidationError";
      throw err;
    }

    const perguntaTrim = pergunta.toString().trim();
    if (!perguntaTrim) {
      const err = new Error("A pergunta não pode ser vazia");
      err.name = "ValidationError";
      throw err;
    }
    // validate curso and componente exist and are related
    const curso = await prismaClient.curso.findUnique({ where: { id_curso: fkId_curso } });
    if (!curso) {
      const err = new Error("Curso não encontrado");
      err.name = "ValidationError";
      throw err;
    }

    const componenteObj = await prismaClient.componente.findUnique({ where: { id_componente: fkId_componente } });
    if (!componenteObj) {
      const err = new Error("Componente não encontrado");
      err.name = "ValidationError";
      throw err;
    }

    if (String(componenteObj.fkId_curso) !== String(fkId_curso)) {
      const err = new Error("O componente selecionado não pertence ao curso informado");
      err.name = "ValidationError";
      throw err;
    }

    const perguntaValidada = validarTextoOuErro(perguntaTrim);

    const perguntaCriada = await prismaClient.pergunta.create({
      data: {
        id_pergunta: randomUUID(),
        fkId_usuario,
        pergunta: perguntaValidada.textoFiltrado,
        fkId_componente,
        fkId_curso,
      },
      include: {
        usuarios: {
          select: {
            id_usuario: true,
            nome_usuario: true,
            apelido_usuario: true,
          },
        },
        componente: {
          select: {
            id_componente: true,
            nome_componente: true,
          },
        },
        curso: {
          select: {
            id_curso: true,
          }
        },
      },
    });

    return perguntaCriada;
  }
}

export { CreatePerguntaService };
