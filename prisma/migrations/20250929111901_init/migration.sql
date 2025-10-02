-- CreateTable
CREATE TABLE `Usuarios` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `nome_usuario` VARCHAR(191) NOT NULL,
    `apelido_usuario` VARCHAR(191) NOT NULL,
    `foto_perfil` VARCHAR(191) NULL,
    `email_usuario` VARCHAR(191) NOT NULL,
    `senha_usuario` VARCHAR(191) NOT NULL,
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
CREATE TABLE `Componente` (
    `id_componente` VARCHAR(191) NOT NULL,
    `nome_componente` VARCHAR(191) NOT NULL,
    `fkId_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_componente`)
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
ALTER TABLE `Componente` ADD CONSTRAINT `Componente_fkId_curso_fkey` FOREIGN KEY (`fkId_curso`) REFERENCES `Curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;
