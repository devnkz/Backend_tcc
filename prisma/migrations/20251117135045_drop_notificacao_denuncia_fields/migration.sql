/*
  Warnings:

  - You are about to drop the column `dataRevisao` on the `notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `denunciadoNome` on the `notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `fkId_conteudo_denunciado` on the `notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `fkId_usuario_conteudo` on the `notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `item_denunciado` on the `notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `nivel_denuncia` on the `notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `revisao` on the `notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_denuncia` on the `notificacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notificacoes` DROP COLUMN `dataRevisao`,
    DROP COLUMN `denunciadoNome`,
    DROP COLUMN `fkId_conteudo_denunciado`,
    DROP COLUMN `fkId_usuario_conteudo`,
    DROP COLUMN `item_denunciado`,
    DROP COLUMN `nivel_denuncia`,
    DROP COLUMN `revisao`,
    DROP COLUMN `tipo_denuncia`;
