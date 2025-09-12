/*
  Warnings:

  - Added the required column `fkIdCurso` to the `Componente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `componente` ADD COLUMN `fkIdCurso` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Componente` ADD CONSTRAINT `Componente_fkIdCurso_fkey` FOREIGN KEY (`fkIdCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
