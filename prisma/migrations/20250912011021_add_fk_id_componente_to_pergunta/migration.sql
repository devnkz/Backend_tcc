/*
  Warnings:

  - Added the required column `fkIdComponente` to the `Pergunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pergunta` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fkIdComponente` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pergunta` ADD CONSTRAINT `Pergunta_fkIdComponente_fkey` FOREIGN KEY (`fkIdComponente`) REFERENCES `Componente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
