DROP DATABASE IF EXISTS blog_posts;
CREATE DATABASE blog_posts;
USE blog_posts;

CREATE TABLE posts (
    id_post    INT PRIMARY KEY AUTO_INCREMENT,
    titulo     VARCHAR(100) NOT NULL,
    descricao  VARCHAR(200),
    conteudo   LONGTEXT,
    autor      VARCHAR(100),
    data_post  DATE
);

CREATE TABLE comentarios (
    id_comentario   INT PRIMARY KEY AUTO_INCREMENT,
    id_post         INT,
    nome            VARCHAR(100),
    texto           VARCHAR(200),
    data_comentario DATE,
    FOREIGN KEY (id_post) REFERENCES posts(id_post) ON DELETE CASCADE
);

-- Dados de exemplo (mesmos do script original, com autor/descricao/nome preenchidos)
INSERT INTO posts (titulo, descricao, conteudo, autor, data_post) VALUES
('Introdução JDBC', 'Como conectar Java ao MySQL', 'Explicação sobre conexão Java-MySQL...', 'Prof. Marcos Alvarenga', '2026-03-10'),
('CRUD em Web', 'Os quatro pilares de toda API', 'Como implementar Create/Read...', 'Equipe Blog.IFRN', '2026-03-12'),
('POO no IFRN', 'Base para todo bom sistema', 'Conceitos para alunos...', 'Equipe Blog.IFRN', '2026-03-14'),
('HTML5 e CSS3', 'Estrutura e estilo modernos', 'Estruturando páginas modernas.', 'Equipe Blog.IFRN', '2026-03-15'),
('JavaScript Assíncrono', 'Promises e Fetch API na prática', 'Entendendo Promises e Fetch API.', 'Equipe Blog.IFRN', '2026-03-16');

INSERT INTO comentarios (id_post, nome, texto, data_comentario) VALUES
(1, 'Ana Souza', 'Ótimo tutorial!', '2026-03-11'),
(1, 'João Lima', 'Me ajudou muito no projeto do IFRN.', '2026-03-11'),
(2, 'Carla Dias', 'Poderia explicar mais sobre o DELETE?', '2026-03-12'),
(2, 'Pedro Alves', 'Exemplo bem claro, valeu!', '2026-03-13'),
(3, 'Marina Reis', 'POO é a base de tudo.', '2026-03-15');
