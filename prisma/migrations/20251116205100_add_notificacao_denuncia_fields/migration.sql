-- AlterTable
ALTER TABLE `notificacoes` ADD COLUMN `dataRevisao` DATETIME(3) NULL,
    ADD COLUMN `denunciadoNome` VARCHAR(191) NULL,
    ADD COLUMN `fkId_conteudo_denunciado` VARCHAR(191) NULL,
    ADD COLUMN `fkId_denuncia` VARCHAR(191) NULL,
    ADD COLUMN `fkId_usuario_conteudo` VARCHAR(191) NULL,
    ADD COLUMN `item_denunciado` VARCHAR(191) NULL,
    ADD COLUMN `nivel_denuncia` INTEGER NULL,
    ADD COLUMN `revisao` VARCHAR(191) NULL,
    ADD COLUMN `tipo_denuncia` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Notificacoes_fkId_denuncia_idx` ON `notificacoes`(`fkId_denuncia`);
