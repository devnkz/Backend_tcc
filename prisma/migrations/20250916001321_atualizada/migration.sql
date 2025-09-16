-- DropForeignKey
ALTER TABLE `resposta` DROP FOREIGN KEY `Resposta_perguntaId_fkey`;

-- DropIndex
DROP INDEX `Resposta_perguntaId_fkey` ON `resposta`;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_perguntaId_fkey` FOREIGN KEY (`perguntaId`) REFERENCES `Pergunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
