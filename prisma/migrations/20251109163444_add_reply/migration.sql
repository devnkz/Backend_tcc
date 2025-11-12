-- AlterTable
ALTER TABLE `mensagem` ADD COLUMN `replyToId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_replyToId_fkey` FOREIGN KEY (`replyToId`) REFERENCES `Mensagem`(`id_mensagem`) ON DELETE SET NULL ON UPDATE CASCADE;
