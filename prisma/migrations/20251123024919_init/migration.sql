-- CreateTable
CREATE TABLE `Conquista` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `progressoMax` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProgressoConquista` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `conquistaId` VARCHAR(191) NOT NULL,
    `progresso` INTEGER NOT NULL DEFAULT 0,
    `concluida` BOOLEAN NOT NULL DEFAULT false,
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProgressoConquista` ADD CONSTRAINT `ProgressoConquista_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProgressoConquista` ADD CONSTRAINT `ProgressoConquista_conquistaId_fkey` FOREIGN KEY (`conquistaId`) REFERENCES `Conquista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
