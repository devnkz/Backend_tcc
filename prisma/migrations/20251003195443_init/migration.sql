-- CreateTable
CREATE TABLE `Mensagem` (
    `id_mensagem` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `dataCriacao_Mensagem` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_mensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
