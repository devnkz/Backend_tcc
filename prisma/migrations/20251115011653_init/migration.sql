-- CreateTable
CREATE TABLE `Usuarios` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `nome_usuario` VARCHAR(191) NOT NULL,
    `apelido_usuario` VARCHAR(191) NOT NULL,
    `foto_perfil` VARCHAR(191) NULL,
    `email_usuario` VARCHAR(191) NOT NULL,
    `senha_usuario` VARCHAR(191) NOT NULL,
    `credibilidade_usuario` INTEGER NOT NULL,
    `fkIdTipoUsuario` VARCHAR(191) NOT NULL,
    `dataCriacao_usuario` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cursoId_curso` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuarios_email_usuario_key`(`email_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoUsuario` (
    `id_tipousuario` VARCHAR(191) NOT NULL,
    `nome_tipousuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_tipousuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id_curso` VARCHAR(191) NOT NULL,
    `nome_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pergunta` (
    `id_pergunta` VARCHAR(191) NOT NULL,
    `pergunta` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_componente` VARCHAR(191) NOT NULL,
    `dataCriacao_pergunta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizacao_pergunta` DATETIME(3) NULL,
    `fkId_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_pergunta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resposta` (
    `id_resposta` VARCHAR(191) NOT NULL,
    `resposta` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_pergunta` VARCHAR(191) NOT NULL,
    `dataCriacao_resposta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizacao_resposta` DATETIME(3) NULL,

    PRIMARY KEY (`id_resposta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id_grupo` VARCHAR(191) NOT NULL,
    `nome_grupo` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membro` (
    `id_membro` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_grupo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Membro_fkId_usuario_fkId_grupo_key`(`fkId_usuario`, `fkId_grupo`),
    PRIMARY KEY (`id_membro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensagem` (
    `id_mensagem` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_grupo` VARCHAR(191) NOT NULL,
    `dataCriacao_Mensagem` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `replyToId` VARCHAR(191) NULL,

    PRIMARY KEY (`id_mensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Componente` (
    `id_componente` VARCHAR(191) NOT NULL,
    `nome_componente` VARCHAR(191) NOT NULL,
    `fkId_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_componente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Denuncias` (
    `id_denuncia` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `fkId_conteudo_denunciado` VARCHAR(191) NOT NULL,
    `fkId_usuario_conteudo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `tipo_conteudo` VARCHAR(191) NOT NULL,
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
    `dataInicio_penalidade` DATETIME(3) NOT NULL,
    `dataFim_penalidade` DATETIME(3) NOT NULL,
    `perder_credibilidade` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `ativa` BOOLEAN NOT NULL DEFAULT true,
    `dataCriacao_penalidade` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Penalidades_fkId_denuncia_key`(`fkId_denuncia`),
    PRIMARY KEY (`id_penalidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notificacoes` (
    `id_notificacao` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `lida` BOOLEAN NOT NULL DEFAULT false,
    `dataCriacao_notificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Notificacoes_fkId_usuario_idx`(`fkId_usuario`),
    PRIMARY KEY (`id_notificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodigoVerificacaoEmail` (
    `id_codigoverificacaoemail` VARCHAR(191) NOT NULL,
    `fkId_usuario` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `dataCriacao_codigo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataExpiracao_codigo` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_codigoverificacaoemail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_fkIdTipoUsuario_fkey` FOREIGN KEY (`fkIdTipoUsuario`) REFERENCES `TipoUsuario`(`id_tipousuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_cursoId_curso_fkey` FOREIGN KEY (`cursoId_curso`) REFERENCES `Curso`(`id_curso`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pergunta` ADD CONSTRAINT `Pergunta_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pergunta` ADD CONSTRAINT `Pergunta_fkId_componente_fkey` FOREIGN KEY (`fkId_componente`) REFERENCES `Componente`(`id_componente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pergunta` ADD CONSTRAINT `Pergunta_fkId_curso_fkey` FOREIGN KEY (`fkId_curso`) REFERENCES `Curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_fkId_pergunta_fkey` FOREIGN KEY (`fkId_pergunta`) REFERENCES `Pergunta`(`id_pergunta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membro` ADD CONSTRAINT `Membro_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membro` ADD CONSTRAINT `Membro_fkId_grupo_fkey` FOREIGN KEY (`fkId_grupo`) REFERENCES `Grupo`(`id_grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_fkId_grupo_fkey` FOREIGN KEY (`fkId_grupo`) REFERENCES `Grupo`(`id_grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_replyToId_fkey` FOREIGN KEY (`replyToId`) REFERENCES `Mensagem`(`id_mensagem`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Componente` ADD CONSTRAINT `Componente_fkId_curso_fkey` FOREIGN KEY (`fkId_curso`) REFERENCES `Curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Denuncias` ADD CONSTRAINT `Denuncias_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penalidades` ADD CONSTRAINT `Penalidades_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penalidades` ADD CONSTRAINT `Penalidades_fkId_denuncia_fkey` FOREIGN KEY (`fkId_denuncia`) REFERENCES `Denuncias`(`id_denuncia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacoes` ADD CONSTRAINT `Notificacoes_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodigoVerificacaoEmail` ADD CONSTRAINT `CodigoVerificacaoEmail_fkId_usuario_fkey` FOREIGN KEY (`fkId_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
