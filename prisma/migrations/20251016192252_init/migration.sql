/*
  Warnings:

  - You are about to drop the column `banimento` on the `penalidades` table. All the data in the column will be lost.
  - You are about to alter the column `perder_credibilidade` on the `penalidades` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `dataFim_penalidade` to the `Penalidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio_penalidade` to the `Penalidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penalidades` DROP COLUMN `banimento`,
    ADD COLUMN `dataFim_penalidade` DATETIME(3) NOT NULL,
    ADD COLUMN `dataInicio_penalidade` DATETIME(3) NOT NULL,
    MODIFY `perder_credibilidade` INTEGER NOT NULL;
