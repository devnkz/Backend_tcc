-- AlterTable
ALTER TABLE "pergunta" ADD COLUMN     "visibilidade_pergunta" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "resposta" ADD COLUMN     "visibilidade_resposta" BOOLEAN NOT NULL DEFAULT true;
