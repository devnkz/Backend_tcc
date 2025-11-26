-- CreateTable
CREATE TABLE "redefinirSenha" (
    "id_redefinirsenha" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "token_redefinirsenha" TEXT NOT NULL,
    "dataCriacao_redefinir" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataExpiracao_redefinir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redefinirSenha_pkey" PRIMARY KEY ("id_redefinirsenha")
);

-- AddForeignKey
ALTER TABLE "redefinirSenha" ADD CONSTRAINT "redefinirSenha_email_usuario_fkey" FOREIGN KEY ("email_usuario") REFERENCES "usuarios"("email_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
