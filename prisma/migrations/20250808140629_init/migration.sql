-- AddForeignKey
ALTER TABLE `pergunta` ADD CONSTRAINT `pergunta_fkIdUsuario_fkey` FOREIGN KEY (`fkIdUsuario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pergunta` ADD CONSTRAINT `pergunta_fkIdComponent_fkey` FOREIGN KEY (`fkIdComponent`) REFERENCES `componente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
