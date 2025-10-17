/*
  Warnings:

  - Added the required column `fkId_usuario_conteudo` to the `Denuncias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `denuncias` ADD COLUMN `fkId_usuario_conteudo` VARCHAR(191) NOT NULL;
