-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/11/2025 às 17:24
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
-- Banco de dados: `app_cadastro`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `analises_profissionais`
--

CREATE TABLE `analises_profissionais` (
  `id` int(11) NOT NULL,
  `id_vinculo` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `observacao` text NOT NULL,
  `data_analise` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `assistidos`
--

CREATE TABLE `assistidos` (
  `id` int(11) NOT NULL,
  `id_responsavel` int(11) NOT NULL,
  `codigo_acesso` varchar(10) DEFAULT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `grau_parentesco` varchar(50) NOT NULL,
  `informacoes_adicionais` text DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Acionadores `assistidos`
--
DELIMITER $$
CREATE TRIGGER `gera_codigo_assistido` BEFORE INSERT ON `assistidos` FOR EACH ROW BEGIN
    IF NEW.codigo_acesso IS NULL OR NEW.codigo_acesso = '' THEN
        SET NEW.codigo_acesso = SUBSTRING(MD5(RAND()), 1, 6);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `caracteristicas_ficha`
--

CREATE TABLE `caracteristicas_ficha` (
  `id` int(11) NOT NULL,
  `texto_caracteristica` varchar(255) NOT NULL,
  `tipo_resposta` enum('SimNao','Numero','TextoCurto') NOT NULL DEFAULT 'SimNao',
  `ordem` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `caracteristicas_ficha`
--

INSERT INTO `caracteristicas_ficha` (`id`, `texto_caracteristica`, `tipo_resposta`, `ordem`) VALUES
(1, 'Nível de Suporte', 'Numero', 1),
(2, 'Usa os verbos corretamente', 'SimNao', 2),
(3, 'Apresenta comportamento repetitivo', 'SimNao', 3),
(4, 'Possui sensibilidade ao som', 'SimNao', 4),
(5, 'Possui sensibilidade ao toque físico', 'SimNao', 5),
(6, 'Faz contato visual', 'SimNao', 6),
(7, 'Consegue expressar ideias', 'SimNao', 7),
(8, 'Apresenta dificuldade na fala', 'SimNao', 8),
(9, 'Demonstra interesses restritos em objetos', 'SimNao', 9);

-- --------------------------------------------------------

--
-- Estrutura para tabela `perguntas`
--

CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL,
  `texto_pergunta` varchar(255) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo_pontuacao` enum('direta','invertida') NOT NULL DEFAULT 'direta',
  `categoria` enum('casa','escola') NOT NULL DEFAULT 'casa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `perguntas`
--

INSERT INTO `perguntas` (`id`, `texto_pergunta`, `data_criacao`, `tipo_pontuacao`, `categoria`) VALUES
(1, 'Usou os verbos corretamente?', '2025-11-14 19:12:40', 'direta', 'casa'),
(2, 'Comportamento repetitivo?', '2025-11-14 19:12:40', 'invertida', 'casa'),
(3, 'Sensibilidade ao som?', '2025-11-14 19:12:40', 'invertida', 'casa'),
(4, 'Sensibilidade ao toque físico?', '2025-11-14 19:12:40', 'invertida', 'casa'),
(5, 'Fez contato visual?', '2025-11-14 19:12:40', 'direta', 'casa'),
(6, 'Expressou ideias?', '2025-11-14 19:12:40', 'direta', 'casa'),
(7, 'Dificuldade na fala?', '2025-11-14 19:12:40', 'invertida', 'casa'),
(8, 'Interesses em objetos?', '2025-11-14 19:12:40', 'direta', 'casa'),
(9, 'Interagiu com colegas no recreio?', '2025-11-24 01:48:33', 'direta', 'escola'),
(10, 'Realizou as atividades propostas?', '2025-11-24 01:48:33', 'direta', 'escola'),
(11, 'Teve crises comportamentais?', '2025-11-24 01:48:33', 'invertida', 'escola'),
(12, 'Demonstrou interesse nas aulas?', '2025-11-24 01:48:33', 'direta', 'escola'),
(16, 'Apresentou sensibilidade ao som?', '2025-11-24 01:50:38', 'invertida', 'escola'),
(17, 'Teve dificuldade na fala?', '2025-11-24 01:50:38', 'invertida', 'escola');

-- --------------------------------------------------------

--
-- Estrutura para tabela `respostas`
--

CREATE TABLE `respostas` (
  `id` int(11) NOT NULL,
  `id_submissao` int(11) NOT NULL,
  `id_pergunta` int(11) NOT NULL,
  `resposta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `respostas_ficha`
--

CREATE TABLE `respostas_ficha` (
  `id` int(11) NOT NULL,
  `id_assistido` int(11) NOT NULL,
  `id_caracteristica` int(11) NOT NULL,
  `valor_resposta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `submissoes`
--

CREATE TABLE `submissoes` (
  `id` int(11) NOT NULL,
  `id_assistido` int(11) NOT NULL,
  `id_responsavel` int(11) NOT NULL,
  `data_submissao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `instituto` varchar(100) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `email_verificado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `tipo`, `area`, `instituto`, `criado_em`, `email_verificado`) VALUES
(8, 'teste2', 'teste2@gmail.com', '$2y$10$PC2TFZLMIHGy6DiQoz30HOY7h7hWXYWumI3IBDsEz6opIhRJDrqa.', 'profissional', 'EDUCACIONAL', 'furg', '2025-11-24 03:11:34', 1),
(9, 'teste', 'teste@gmail.com', '$2y$10$T/Tl7KmqHpR2UVSUYiwfi.UnqN1xybQXU6iH68PGRGwGtuilYmjQq', 'responsavel', '', '', '2025-11-24 14:36:05', 1),
(10, 'teste3', 'teste3@gmail.com', '$2y$10$/K4RXWbSerYRAOxTOwzuX.wYZZbMAHWS8gFf645F0IbFAb3lXJUqK', 'profissional', 'SAÚDE', 'ababa', '2025-11-24 16:12:13', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `verificacao_email`
--

CREATE TABLE `verificacao_email` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expira_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `vinculos_profissionais`
--

CREATE TABLE `vinculos_profissionais` (
  `id` int(11) NOT NULL,
  `id_profissional` int(11) NOT NULL,
  `id_assistido` int(11) NOT NULL,
  `data_vinculo` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `analises_profissionais`
--
ALTER TABLE `analises_profissionais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_vinculo` (`id_vinculo`);

--
-- Índices de tabela `assistidos`
--
ALTER TABLE `assistidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_acesso` (`codigo_acesso`),
  ADD KEY `id_responsavel` (`id_responsavel`);

--
-- Índices de tabela `caracteristicas_ficha`
--
ALTER TABLE `caracteristicas_ficha`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `perguntas`
--
ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `texto_pergunta` (`texto_pergunta`);

--
-- Índices de tabela `respostas`
--
ALTER TABLE `respostas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_submissao` (`id_submissao`),
  ADD KEY `id_pergunta` (`id_pergunta`);

--
-- Índices de tabela `respostas_ficha`
--
ALTER TABLE `respostas_ficha`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assistido_caracteristica_unique` (`id_assistido`,`id_caracteristica`),
  ADD KEY `id_caracteristica` (`id_caracteristica`);

--
-- Índices de tabela `submissoes`
--
ALTER TABLE `submissoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_assistido` (`id_assistido`),
  ADD KEY `id_responsavel` (`id_responsavel`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `verificacao_email`
--
ALTER TABLE `verificacao_email`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `vinculos_profissionais`
--
ALTER TABLE `vinculos_profissionais`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unico_vinculo` (`id_profissional`,`id_assistido`),
  ADD KEY `id_assistido` (`id_assistido`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `analises_profissionais`
--
ALTER TABLE `analises_profissionais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `assistidos`
--
ALTER TABLE `assistidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `caracteristicas_ficha`
--
ALTER TABLE `caracteristicas_ficha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `perguntas`
--
ALTER TABLE `perguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `respostas`
--
ALTER TABLE `respostas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT de tabela `respostas_ficha`
--
ALTER TABLE `respostas_ficha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT de tabela `submissoes`
--
ALTER TABLE `submissoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `verificacao_email`
--
ALTER TABLE `verificacao_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `vinculos_profissionais`
--
ALTER TABLE `vinculos_profissionais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `analises_profissionais`
--
ALTER TABLE `analises_profissionais`
  ADD CONSTRAINT `analises_profissionais_ibfk_1` FOREIGN KEY (`id_vinculo`) REFERENCES `vinculos_profissionais` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `assistidos`
--
ALTER TABLE `assistidos`
  ADD CONSTRAINT `assistidos_ibfk_1` FOREIGN KEY (`id_responsavel`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `respostas`
--
ALTER TABLE `respostas`
  ADD CONSTRAINT `respostas_ibfk_1` FOREIGN KEY (`id_submissao`) REFERENCES `submissoes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `respostas_ibfk_2` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `respostas_ficha`
--
ALTER TABLE `respostas_ficha`
  ADD CONSTRAINT `respostas_ficha_ibfk_1` FOREIGN KEY (`id_assistido`) REFERENCES `assistidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `respostas_ficha_ibfk_2` FOREIGN KEY (`id_caracteristica`) REFERENCES `caracteristicas_ficha` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `submissoes`
--
ALTER TABLE `submissoes`
  ADD CONSTRAINT `submissoes_ibfk_1` FOREIGN KEY (`id_assistido`) REFERENCES `assistidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `submissoes_ibfk_2` FOREIGN KEY (`id_responsavel`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `verificacao_email`
--
ALTER TABLE `verificacao_email`
  ADD CONSTRAINT `verificacao_email_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `vinculos_profissionais`
--
ALTER TABLE `vinculos_profissionais`
  ADD CONSTRAINT `vinculos_profissionais_ibfk_1` FOREIGN KEY (`id_profissional`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vinculos_profissionais_ibfk_2` FOREIGN KEY (`id_assistido`) REFERENCES `assistidos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
