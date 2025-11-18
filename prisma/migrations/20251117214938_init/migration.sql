-- CreateTable
CREATE TABLE `componente` (
    `id_componente` VARCHAR(191) NOT NULL,
    `nome_componente` VARCHAR(191) NOT NULL,
    `fkId_curso` VARCHAR(191) NOT NULL,

    INDEX `Componente_fkId_curso_fkey`(`fkId_curso`),
    PRIMARY KEY (`id_componente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `curso` (
    `id_curso` VARCHAR(191) NOT NULL,
    `nome_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `denuncias` (
    `id_denuncia` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_conteudo_denunciado` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `nivel_denuncia` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `resultado` VARCHAR(191) NOT NULL,
    `tipo_denuncia` VARCHAR(191) NULL,
    `dataCriacao_denuncia` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo_conteudo` VARCHAR(191) NOT NULL,
    `fkId_usuario_conteudo` VARCHAR(191) NOT NULL,

    INDEX `Denuncias_fkId_usuario_fkey`(`fkId_usuario`),
    PRIMARY KEY (`id_denuncia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupo` (
    `id_grupo` VARCHAR(191) NOT NULL,
    `nome_grupo` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,

    INDEX `Grupo_fkId_usuario_fkey`(`fkId_usuario`),
    PRIMARY KEY (`id_grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membro` (
    `id_membro` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_grupo` VARCHAR(191) NOT NULL,

    INDEX `Membro_fkId_grupo_fkey`(`fkId_grupo`),
    UNIQUE INDEX `Membro_fkId_usuario_fkId_grupo_key`(`fkId_usuario`, `fkId_grupo`),
    PRIMARY KEY (`id_membro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mensagem` (
    `id_mensagem` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_grupo` VARCHAR(191) NOT NULL,
    `dataCriacao_Mensagem` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `replyToId` VARCHAR(191) NULL,

    INDEX `Mensagem_fkId_grupo_fkey`(`fkId_grupo`),
    INDEX `Mensagem_fkId_usuario_fkey`(`fkId_usuario`),
    INDEX `Mensagem_replyToId_fkey`(`replyToId`),
    PRIMARY KEY (`id_mensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacoes` (
    `id_notificacao` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `lida` BOOLEAN NOT NULL DEFAULT false,
    `tipo` VARCHAR(191) NOT NULL,
    `fkId_denuncia` VARCHAR(191) NULL,
    `dataCriacao_notificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Notificacoes_fkId_usuario_idx`(`fkId_usuario`),
    INDEX `Notificacoes_fkId_denuncia_idx`(`fkId_denuncia`),
    PRIMARY KEY (`id_notificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penalidades` (
    `id_penalidade` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_denuncia` VARCHAR(191) NOT NULL,
    `perder_credibilidade` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `ativa` BOOLEAN NOT NULL DEFAULT true,
    `dataCriacao_penalidade` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataFim_penalidade` DATETIME(3) NOT NULL,
    `dataInicio_penalidade` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Penalidades_fkId_denuncia_key`(`fkId_denuncia`),
    INDEX `Penalidades_fkId_usuario_fkey`(`fkId_usuario`),
    PRIMARY KEY (`id_penalidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pergunta` (
    `id_pergunta` VARCHAR(191) NOT NULL,
    `pergunta` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_componente` VARCHAR(191) NOT NULL,
    `dataCriacao_pergunta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fkId_curso` VARCHAR(191) NOT NULL,
    `dataAtualizacao_pergunta` DATETIME(3) NULL,

    INDEX `Pergunta_fkId_componente_fkey`(`fkId_componente`),
    INDEX `Pergunta_fkId_curso_fkey`(`fkId_curso`),
    INDEX `Pergunta_fkId_usuario_fkey`(`fkId_usuario`),
    PRIMARY KEY (`id_pergunta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resposta` (
    `id_resposta` VARCHAR(191) NOT NULL,
    `resposta` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_pergunta` VARCHAR(191) NOT NULL,
    `dataCriacao_resposta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizacao_resposta` DATETIME(3) NULL,

    INDEX `Resposta_fkId_pergunta_fkey`(`fkId_pergunta`),
    INDEX `Resposta_fkId_usuario_fkey`(`fkId_usuario`),
    PRIMARY KEY (`id_resposta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipousuario` (
    `id_tipousuario` VARCHAR(191) NOT NULL,
    `nome_tipousuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_tipousuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `nome_usuario` VARCHAR(191) NOT NULL,
    `apelido_usuario` VARCHAR(191) NOT NULL,
    `foto_perfil` VARCHAR(191) NULL,
    `email_usuario` VARCHAR(191) NOT NULL,
    `senha_usuario` VARCHAR(191) NOT NULL,
    `fkIdTipoUsuario` VARCHAR(191) NOT NULL,
    `dataCriacao_usuario` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cursoId_curso` VARCHAR(191) NULL,
    `credibilidade_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `Usuarios_email_usuario_key`(`email_usuario`),
    INDEX `Usuarios_cursoId_curso_fkey`(`cursoId_curso`),
    INDEX `Usuarios_fkIdTipoUsuario_fkey`(`fkIdTipoUsuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodigoVerificacaoEmail` (
    `id_codigoverificacaoemail` VARCHAR(191) NOT NULL,
    `email_usuario` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `dataCriacao_codigo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataExpiracao_codigo` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_codigoverificacaoemail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `componente` ADD CONSTRAINT `Componente_fkId_curso_fkey` FOREIGN KEY (`fkId_curso`) REFERENCES `curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `denuncias` ADD CONSTRAINT `Denuncias_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupo` ADD CONSTRAINT `Grupo_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membro` ADD CONSTRAINT `Membro_fkId_grupo_fkey` FOREIGN KEY (`fkId_grupo`) REFERENCES `grupo`(`id_grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membro` ADD CONSTRAINT `Membro_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagem` ADD CONSTRAINT `Mensagem_fkId_grupo_fkey` FOREIGN KEY (`fkId_grupo`) REFERENCES `grupo`(`id_grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagem` ADD CONSTRAINT `Mensagem_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagem` ADD CONSTRAINT `Mensagem_replyToId_fkey` FOREIGN KEY (`replyToId`) REFERENCES `mensagem`(`id_mensagem`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificacoes` ADD CONSTRAINT `Notificacoes_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penalidades` ADD CONSTRAINT `Penalidades_fkId_denuncia_fkey` FOREIGN KEY (`fkId_denuncia`) REFERENCES `denuncias`(`id_denuncia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penalidades` ADD CONSTRAINT `Penalidades_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pergunta` ADD CONSTRAINT `Pergunta_fkId_componente_fkey` FOREIGN KEY (`fkId_componente`) REFERENCES `componente`(`id_componente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pergunta` ADD CONSTRAINT `Pergunta_fkId_curso_fkey` FOREIGN KEY (`fkId_curso`) REFERENCES `curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pergunta` ADD CONSTRAINT `Pergunta_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta` ADD CONSTRAINT `Resposta_fkId_pergunta_fkey` FOREIGN KEY (`fkId_pergunta`) REFERENCES `pergunta`(`id_pergunta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta` ADD CONSTRAINT `Resposta_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `Usuarios_cursoId_curso_fkey` FOREIGN KEY (`cursoId_curso`) REFERENCES `curso`(`id_curso`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `Usuarios_fkIdTipoUsuario_fkey` FOREIGN KEY (`fkIdTipoUsuario`) REFERENCES `tipousuario`(`id_tipousuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodigoVerificacaoEmail` ADD CONSTRAINT `CodigoVerificacaoEmail_email_usuario_fkey` FOREIGN KEY (`email_usuario`) REFERENCES `usuarios`(`email_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
