/*
  Warnings:

  - You are about to drop the `grupouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdById` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `grupouser` DROP FOREIGN KEY `GrupoUser_grupoId_fkey`;

-- DropForeignKey
ALTER TABLE `grupouser` DROP FOREIGN KEY `GrupoUser_userId_fkey`;

-- AlterTable
ALTER TABLE `grupo` ADD COLUMN `createdById` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `grupouser`;

-- CreateTable
CREATE TABLE `Membro` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Membro_userId_grupoId_key`(`userId`, `grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membro` ADD CONSTRAINT `Membro_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membro` ADD CONSTRAINT `Membro_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
