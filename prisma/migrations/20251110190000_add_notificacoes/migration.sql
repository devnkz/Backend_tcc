-- CreateTable
CREATE TABLE `Notificacoes` (
  `id_notificacao` VARCHAR(191) NOT NULL,
  `fkId_usuario` VARCHAR(191) NOT NULL,
  `titulo` VARCHAR(191) NOT NULL,
  `mensagem` TEXT NOT NULL,
  `lida` BOOLEAN NOT NULL DEFAULT false,
  `tipo` VARCHAR(50) NOT NULL,
  `dataCriacao_notificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id_notificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notificacoes` ADD CONSTRAINT `Notificacoes_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
