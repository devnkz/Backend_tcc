-- CreateTable
CREATE TABLE `Denuncias` (
    `id_denuncia` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_conteudo_denunciado` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `nivel_denuncia` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `resultado` VARCHAR(191) NOT NULL,
    `dataCriacao_denuncia` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_denuncia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penalidades` (
    `id_penalidade` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_denuncia` VARCHAR(191) NOT NULL,
    `banimento` VARCHAR(191) NULL,
    `perder_credibilidade` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `ativa` BOOLEAN NOT NULL DEFAULT true,
    `dataCriacao_penalidade` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Penalidades_fkId_denuncia_key`(`fkId_denuncia`),
    PRIMARY KEY (`id_penalidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Denuncias` ADD CONSTRAINT `Denuncias_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penalidades` ADD CONSTRAINT `Penalidades_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penalidades` ADD CONSTRAINT `Penalidades_fkId_denuncia_fkey` FOREIGN KEY (`fkId_denuncia`) REFERENCES `Denuncias`(`id_denuncia`) ON DELETE RESTRICT ON UPDATE CASCADE;
