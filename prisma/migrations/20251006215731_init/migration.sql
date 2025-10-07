/*
  Warnings:

  - Added the required column `credibilidade_usuario` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `credibilidade_usuario` INTEGER NOT NULL;
