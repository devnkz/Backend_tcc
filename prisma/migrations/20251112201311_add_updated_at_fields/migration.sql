-- DropForeignKey
ALTER TABLE `notificacoes` DROP FOREIGN KEY `Notificacoes_fkId_usuario_fkey`;

-- AlterTable
ALTER TABLE `notificacoes` MODIFY `mensagem` VARCHAR(191) NOT NULL,
    MODIFY `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pergunta` ADD COLUMN `dataAtualizacao_pergunta` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `resposta` ADD COLUMN `dataAtualizacao_resposta` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Notificacoes` ADD CONSTRAINT `Notificacoes_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `Notificacoes_fkId_usuario_idx` ON `Notificacoes`(`fkId_usuario`);
DROP INDEX `Notificacoes_fkId_usuario_fkey` ON `notificacoes`;
