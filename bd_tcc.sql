-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/09/2025 às 11:19
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_tcc`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `artigo`
--

CREATE TABLE `artigo` (
  `id` varchar(191) NOT NULL,
  `fkIdComponente` varchar(191) NOT NULL,
  `nomeArtigo` varchar(191) NOT NULL,
  `textoArtigo` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentario`
--

CREATE TABLE `comentario` (
  `id` varchar(191) NOT NULL,
  `fkIdResposta` varchar(191) NOT NULL,
  `fkIdUsuario` varchar(191) NOT NULL,
  `comentario` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `componente`
--

CREATE TABLE `componente` (
  `id` varchar(191) NOT NULL,
  `nomeComponente` varchar(191) NOT NULL,
  `fkIdCurso` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `componente`
--

INSERT INTO `componente` (`id`, `nomeComponente`, `fkIdCurso`) VALUES
('6473c35d-d0aa-4973-8fe8-f8bb3c8c567e', 'Meu novo componente', '445fda64-ed80-42b4-9cac-67c3b5877309');

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `id` varchar(191) NOT NULL,
  `nomeCurso` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `curso`
--

INSERT INTO `curso` (`id`, `nomeCurso`) VALUES
('445fda64-ed80-42b4-9cac-67c3b5877309', 'Teste de curso');

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupo`
--

CREATE TABLE `grupo` (
  `id` varchar(191) NOT NULL,
  `nomeGrupo` varchar(191) NOT NULL,
  `fkIdComponente` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `grupo`
--

INSERT INTO `grupo` (`id`, `nomeGrupo`, `fkIdComponente`) VALUES
('69f836f9-0f92-441e-8e48-ed543359b8c0', 'Meu novo grupo', '6473c35d-d0aa-4973-8fe8-f8bb3c8c567e'),
('80acb0f6-dfa7-4598-ae19-94683f040510', 'Meu novo grupo', '6473c35d-d0aa-4973-8fe8-f8bb3c8c567e'),
('c2307e1f-0c78-4115-a305-9bb55b7e5c32', 'Teste', '6473c35d-d0aa-4973-8fe8-f8bb3c8c567e');

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupouser`
--

CREATE TABLE `grupouser` (
  `id` varchar(191) NOT NULL,
  `grupoId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `grupouser`
--

INSERT INTO `grupouser` (`id`, `grupoId`, `userId`) VALUES
('f4df79e1-98ae-4ee9-b5d5-fec7bd96ca37', '69f836f9-0f92-441e-8e48-ed543359b8c0', '4cd38e76-a023-47f2-b18e-44aedd18f426'),
('455bd784-053d-4191-b7b8-604e272b6e8e', '69f836f9-0f92-441e-8e48-ed543359b8c0', 'e55a87e6-f88f-491f-9535-bae23ad74559'),
('f4351520-bf68-4b44-9e6b-691d754c85d4', '80acb0f6-dfa7-4598-ae19-94683f040510', 'e55a87e6-f88f-491f-9535-bae23ad74559'),
('7effbbe1-5b46-4acc-b8db-6adcec013c8b', 'c2307e1f-0c78-4115-a305-9bb55b7e5c32', '4cd38e76-a023-47f2-b18e-44aedd18f426'),
('667637b8-2c7e-4bb2-be84-733b3c701e6e', 'c2307e1f-0c78-4115-a305-9bb55b7e5c32', 'e55a87e6-f88f-491f-9535-bae23ad74559');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pergunta`
--

CREATE TABLE `pergunta` (
  `id` varchar(191) NOT NULL,
  `fkIdUsuario` varchar(191) NOT NULL,
  `pergunta` varchar(191) NOT NULL,
  `fkIdComponent` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `pergunta`
--

INSERT INTO `pergunta` (`id`, `fkIdUsuario`, `pergunta`, `fkIdComponent`, `createdAt`) VALUES
('079c8c3b-3c6c-4878-abff-feb1ad9140ff', '4cd38e76-a023-47f2-b18e-44aedd18f426', 'Teste de pergunta', '6473c35d-d0aa-4973-8fe8-f8bb3c8c567e', '2025-09-03 22:01:21.363');

-- --------------------------------------------------------

--
-- Estrutura para tabela `resposta`
--

CREATE TABLE `resposta` (
  `id` varchar(191) NOT NULL,
  `fkIdPergunta` varchar(191) NOT NULL,
  `fkIdUsuario` varchar(191) NOT NULL,
  `resposta` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tag`
--

CREATE TABLE `tag` (
  `id` varchar(191) NOT NULL,
  `nomeTag` varchar(191) NOT NULL,
  `descricaoTag` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipousuario`
--

CREATE TABLE `tipousuario` (
  `id` varchar(191) NOT NULL,
  `nomeTipoUsuario` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `tipousuario`
--

INSERT INTO `tipousuario` (`id`, `nomeTipoUsuario`) VALUES
('03006a61-b03c-4a22-be36-60ed085baf6a', 'Administrador'),
('3d71a7b1-e799-4520-bcab-e7a172cd293f', 'Aluno'),
('4c553e03-41f7-44b3-b216-f886969aeae7', 'Professor');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `apelido` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `senha` varchar(191) NOT NULL,
  `fkIdTipoUsuario` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `fotoPerfil` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `name`, `apelido`, `email`, `senha`, `fkIdTipoUsuario`, `createdAt`, `fotoPerfil`) VALUES
('4cd38e76-a023-47f2-b18e-44aedd18f426', 'Nyckolas', 'TIO TI', 'meuemail@gmail.com', '$2b$10$nF774OV6kgFHQCc9smWzauXePcBXQQxmTM3IvZ2SjEKzL4YAo3/Qm', 'd419bc88-a455-40a4-884c-e79269125351', '2025-09-01 22:09:56.374', 'http://localhost:3333/uploads/edbbd377124aa193-teste2.png'),
('e55a87e6-f88f-491f-9535-bae23ad74559', 'Conta 2', 'Second account', 'conta2@gmail.com', '$2b$10$oYFPK3nUSj2WupuarcvXqu1JV3/uuwY5UhBrkJCbrADH3hh0Qr7Uy', 'd419bc88-a455-40a4-884c-e79269125351', '2025-09-04 00:26:19.587', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('040d7175-5f9c-4d3f-aad4-38150d46ef19', '3af9bcccd2a18e2b36ce95a99a0d416f29738693120da944d2936a29fb3bcb78', '2025-09-07 23:16:37.293', '20250907231636_init', NULL, NULL, '2025-09-07 23:16:37.286', 1),
('5a1cdd40-0757-49d6-9d00-99e544f1cd0c', 'c9337eeb8574e713bfd2415092374372b0cdd8947e0c3e854ce08ffb33d95c6a', '2025-07-25 00:45:32.082', '20250725004531_inir', NULL, NULL, '2025-07-25 00:45:31.993', 1),
('e3b2e4d8-7c61-4d4a-a135-cad1d38ed7f0', '100c96dc7cece970ded2d0fbe17d9ffbfc8bfddebaf2c962f70ffeb78fbe33f9', '2025-08-23 20:24:54.248', '20250808140629_init', NULL, NULL, '2025-08-23 20:24:54.176', 1),
('f259027f-8669-4e2c-ba8d-db114d46f67f', '61044335394904e36d8660b047f90855270b8e30b801a9fdf76068539c22b0d0', '2025-08-23 20:24:54.780', '20250823202454_init', NULL, NULL, '2025-08-23 20:24:54.697', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `artigo`
--
ALTER TABLE `artigo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `componente`
--
ALTER TABLE `componente`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `grupouser`
--
ALTER TABLE `grupouser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grupoUser_grupoId_userId_key` (`grupoId`,`userId`),
  ADD KEY `grupoUser_userId_fkey` (`userId`);

--
-- Índices de tabela `pergunta`
--
ALTER TABLE `pergunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pergunta_fkIdUsuario_fkey` (`fkIdUsuario`),
  ADD KEY `pergunta_fkIdComponent_fkey` (`fkIdComponent`);

--
-- Índices de tabela `resposta`
--
ALTER TABLE `resposta`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tipousuario`
--
ALTER TABLE `tipousuario`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_key` (`email`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `grupouser`
--
ALTER TABLE `grupouser`
  ADD CONSTRAINT `grupoUser_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `grupo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `grupoUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `pergunta`
--
ALTER TABLE `pergunta`
  ADD CONSTRAINT `pergunta_fkIdComponent_fkey` FOREIGN KEY (`fkIdComponent`) REFERENCES `componente` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pergunta_fkIdUsuario_fkey` FOREIGN KEY (`fkIdUsuario`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
