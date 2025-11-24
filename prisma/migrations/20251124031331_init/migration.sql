-- CreateTable
CREATE TABLE "componente" (
    "id_componente" TEXT NOT NULL,
    "nome_componente" TEXT NOT NULL,
    "fkId_curso" TEXT NOT NULL,

    CONSTRAINT "componente_pkey" PRIMARY KEY ("id_componente")
);

-- CreateTable
CREATE TABLE "curso" (
    "id_curso" TEXT NOT NULL,
    "nome_curso" TEXT NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "denuncias" (
    "id_denuncia" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,
    "fkId_conteudo_denunciado" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nivel_denuncia" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "resultado" TEXT,
    "tipo_denuncia" TEXT,
    "dataCriacao_denuncia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_conteudo" TEXT NOT NULL,
    "fkId_usuario_conteudo" TEXT NOT NULL,

    CONSTRAINT "denuncias_pkey" PRIMARY KEY ("id_denuncia")
);

-- CreateTable
CREATE TABLE "grupo" (
    "id_grupo" TEXT NOT NULL,
    "nome_grupo" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,

    CONSTRAINT "grupo_pkey" PRIMARY KEY ("id_grupo")
);

-- CreateTable
CREATE TABLE "membro" (
    "id_membro" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,
    "fkId_grupo" TEXT NOT NULL,

    CONSTRAINT "membro_pkey" PRIMARY KEY ("id_membro")
);

-- CreateTable
CREATE TABLE "mensagem" (
    "id_mensagem" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,
    "fkId_grupo" TEXT NOT NULL,
    "dataCriacao_Mensagem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyToId" TEXT,

    CONSTRAINT "mensagem_pkey" PRIMARY KEY ("id_mensagem")
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "id_notificacao" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "tipo" TEXT NOT NULL,
    "fkId_denuncia" TEXT,
    "dataCriacao_notificacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id_notificacao")
);

-- CreateTable
CREATE TABLE "penalidades" (
    "id_penalidade" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,
    "fkId_denuncia" TEXT NOT NULL,
    "perder_credibilidade" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "dataCriacao_penalidade" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim_penalidade" TIMESTAMP(3) NOT NULL,
    "dataInicio_penalidade" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penalidades_pkey" PRIMARY KEY ("id_penalidade")
);

-- CreateTable
CREATE TABLE "pergunta" (
    "id_pergunta" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,
    "fkId_componente" TEXT NOT NULL,
    "dataCriacao_pergunta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fkId_curso" TEXT NOT NULL,
    "dataAtualizacao_pergunta" TIMESTAMP(3),

    CONSTRAINT "pergunta_pkey" PRIMARY KEY ("id_pergunta")
);

-- CreateTable
CREATE TABLE "resposta" (
    "id_resposta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "fkId_usuario" TEXT NOT NULL,
    "fkId_pergunta" TEXT NOT NULL,
    "dataCriacao_resposta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao_resposta" TIMESTAMP(3),

    CONSTRAINT "resposta_pkey" PRIMARY KEY ("id_resposta")
);

-- CreateTable
CREATE TABLE "tipousuario" (
    "id_tipousuario" TEXT NOT NULL,
    "nome_tipousuario" TEXT NOT NULL,

    CONSTRAINT "tipousuario_pkey" PRIMARY KEY ("id_tipousuario")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" TEXT NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "apelido_usuario" TEXT NOT NULL,
    "foto_perfil" TEXT,
    "email_usuario" TEXT NOT NULL,
    "senha_usuario" TEXT NOT NULL,
    "fkIdTipoUsuario" TEXT NOT NULL,
    "dataCriacao_usuario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cursoId_curso" TEXT,
    "credibilidade_usuario" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "CodigoVerificacaoEmail" (
    "id_codigoverificacaoemail" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "dataCriacao_codigo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataExpiracao_codigo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodigoVerificacaoEmail_pkey" PRIMARY KEY ("id_codigoverificacaoemail")
);

-- CreateTable
CREATE TABLE "Conquista" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "progressoMax" INTEGER NOT NULL,

    CONSTRAINT "Conquista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressoConquista" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "conquistaId" TEXT NOT NULL,
    "progresso" INTEGER NOT NULL DEFAULT 0,
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressoConquista_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "componente_fkId_curso_idx" ON "componente"("fkId_curso");

-- CreateIndex
CREATE INDEX "denuncias_fkId_usuario_idx" ON "denuncias"("fkId_usuario");

-- CreateIndex
CREATE INDEX "grupo_fkId_usuario_idx" ON "grupo"("fkId_usuario");

-- CreateIndex
CREATE INDEX "membro_fkId_grupo_idx" ON "membro"("fkId_grupo");

-- CreateIndex
CREATE UNIQUE INDEX "membro_fkId_usuario_fkId_grupo_key" ON "membro"("fkId_usuario", "fkId_grupo");

-- CreateIndex
CREATE INDEX "mensagem_fkId_grupo_idx" ON "mensagem"("fkId_grupo");

-- CreateIndex
CREATE INDEX "mensagem_fkId_usuario_idx" ON "mensagem"("fkId_usuario");

-- CreateIndex
CREATE INDEX "mensagem_replyToId_idx" ON "mensagem"("replyToId");

-- CreateIndex
CREATE INDEX "notificacoes_fkId_usuario_idx" ON "notificacoes"("fkId_usuario");

-- CreateIndex
CREATE INDEX "notificacoes_fkId_denuncia_idx" ON "notificacoes"("fkId_denuncia");

-- CreateIndex
CREATE UNIQUE INDEX "penalidades_fkId_denuncia_key" ON "penalidades"("fkId_denuncia");

-- CreateIndex
CREATE INDEX "penalidades_fkId_usuario_idx" ON "penalidades"("fkId_usuario");

-- CreateIndex
CREATE INDEX "pergunta_fkId_componente_idx" ON "pergunta"("fkId_componente");

-- CreateIndex
CREATE INDEX "pergunta_fkId_curso_idx" ON "pergunta"("fkId_curso");

-- CreateIndex
CREATE INDEX "pergunta_fkId_usuario_idx" ON "pergunta"("fkId_usuario");

-- CreateIndex
CREATE INDEX "resposta_fkId_pergunta_idx" ON "resposta"("fkId_pergunta");

-- CreateIndex
CREATE INDEX "resposta_fkId_usuario_idx" ON "resposta"("fkId_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_usuario_key" ON "usuarios"("email_usuario");

-- CreateIndex
CREATE INDEX "usuarios_cursoId_curso_idx" ON "usuarios"("cursoId_curso");

-- CreateIndex
CREATE INDEX "usuarios_fkIdTipoUsuario_idx" ON "usuarios"("fkIdTipoUsuario");

-- AddForeignKey
ALTER TABLE "componente" ADD CONSTRAINT "componente_fkId_curso_fkey" FOREIGN KEY ("fkId_curso") REFERENCES "curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "denuncias" ADD CONSTRAINT "denuncias_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo" ADD CONSTRAINT "grupo_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membro" ADD CONSTRAINT "membro_fkId_grupo_fkey" FOREIGN KEY ("fkId_grupo") REFERENCES "grupo"("id_grupo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membro" ADD CONSTRAINT "membro_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_fkId_grupo_fkey" FOREIGN KEY ("fkId_grupo") REFERENCES "grupo"("id_grupo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "mensagem"("id_mensagem") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalidades" ADD CONSTRAINT "penalidades_fkId_denuncia_fkey" FOREIGN KEY ("fkId_denuncia") REFERENCES "denuncias"("id_denuncia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalidades" ADD CONSTRAINT "penalidades_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "pergunta_fkId_componente_fkey" FOREIGN KEY ("fkId_componente") REFERENCES "componente"("id_componente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "pergunta_fkId_curso_fkey" FOREIGN KEY ("fkId_curso") REFERENCES "curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "pergunta_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta" ADD CONSTRAINT "resposta_fkId_pergunta_fkey" FOREIGN KEY ("fkId_pergunta") REFERENCES "pergunta"("id_pergunta") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta" ADD CONSTRAINT "resposta_fkId_usuario_fkey" FOREIGN KEY ("fkId_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_cursoId_curso_fkey" FOREIGN KEY ("cursoId_curso") REFERENCES "curso"("id_curso") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_fkIdTipoUsuario_fkey" FOREIGN KEY ("fkIdTipoUsuario") REFERENCES "tipousuario"("id_tipousuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodigoVerificacaoEmail" ADD CONSTRAINT "CodigoVerificacaoEmail_email_usuario_fkey" FOREIGN KEY ("email_usuario") REFERENCES "usuarios"("email_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressoConquista" ADD CONSTRAINT "ProgressoConquista_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressoConquista" ADD CONSTRAINT "ProgressoConquista_conquistaId_fkey" FOREIGN KEY ("conquistaId") REFERENCES "Conquista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
