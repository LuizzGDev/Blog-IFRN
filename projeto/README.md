# Blog.IFRN — Front-end + Back-end (Spring Boot + MySQL)

Este pacote contém a evolução do projeto **Blog.IFRN**: o mesmo
front-end da etapa anterior, agora consumindo uma API REST em Spring
Boot conectada ao MySQL, em vez de `localStorage`. Segue exatamente o
roteiro do professor: `@RestController`, endpoints testados via
Postman/Insomnia.

## Estrutura

```
projeto/
├── blogifrn-api/              -> back-end (Spring Boot)
│   ├── pom.xml
│   ├── BD_BLOGPOST_atualizado.sql
│   └── src/main/java/br/edu/ifrn/blogifrn/
│       ├── BlogIfrnApplication.java
│       ├── config/CorsConfig.java
│       ├── model/Post.java
│       ├── model/Comentario.java
│       ├── repository/PostRepository.java
│       ├── repository/ComentarioRepository.java
│       └── controller/PostController.java, ComentarioController.java
├── frontend/                  -> front-end (mesmo de antes, adaptado)
│   ├── index.html
│   ├── style.css
│   └── script.js              -> agora usa fetch() em vez de localStorage
└── DOCUMENTACAO_IA.md          -> documentação obrigatória (item 6)
```

## Passo a passo para rodar

### 1. Banco de dados (MySQL)
Abra o MySQL Workbench (ou terminal `mysql`) e rode o script:
```
blogifrn-api/BD_BLOGPOST_atualizado.sql
```
Isso cria o banco `blog_posts` com as tabelas `posts` e `comentarios`
já com os campos usados pelo front-end (`descricao`, `autor`, `nome`).

> Ajuste o nome do banco e os dados de exemplo para o título/tema do
> seu grupo, se necessário.

### 2. Configurar a conexão
Em `blogifrn-api/src/main/resources/application.properties`, troque:
```
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_AQUI
```
pelas credenciais do MySQL da sua máquina.

### 3. Rodar a API
Na pasta `blogifrn-api`, com o JDK 17+ instalado:
```bash
mvn spring-boot:run
```
Ou rode a classe `BlogIfrnApplication` pela sua IDE (IntelliJ, Eclipse,
VS Code). A API sobe em `http://localhost:8080`.

### 4. Testar os endpoints (Passo 6 do roteiro)
Use Postman/Insomnia para validar antes de usar o front-end:

| Método | Endpoint                          | Ação                          |
|--------|------------------------------------|--------------------------------|
| GET    | `/api/posts`                       | Lista todos os posts          |
| GET    | `/api/posts/{id}`                  | Busca um post                 |
| POST   | `/api/posts`                       | Cria um post                  |
| PUT    | `/api/posts/{id}`                  | Atualiza um post               |
| DELETE | `/api/posts/{id}`                  | Remove um post                |
| GET    | `/api/posts/{id}/comentarios`      | Lista comentários de um post  |
| POST   | `/api/posts/{id}/comentarios`      | Cria um comentário            |
| DELETE | `/api/comentarios/{id}`            | Remove um comentário          |

Exemplo de corpo (JSON) para `POST /api/posts`:
```json
{
  "titulo": "Meu novo post",
  "descricao": "Um resumo curto",
  "conteudo": "Conteúdo completo do post...",
  "autor": "Fulano de Tal"
}
```

### 5. Rodar o front-end
Abra a pasta `frontend/` com a extensão **Live Server** (VS Code) ou
qualquer servidor estático — ou simplesmente abra `index.html` no
navegador. Ele vai chamar a API em `http://localhost:8080/api`
(constante `API_URL` no topo de `script.js`; troque se a API rodar em
outra porta/host).

## Observações importantes
- O CORS já está liberado em `CorsConfig.java` para a API aceitar
  chamadas do front-end, mesmo rodando em origem/porta diferente.
- `spring.jpa.hibernate.ddl-auto=update` deixa o Hibernate criar/ajustar
  as tabelas automaticamente a partir das entidades — útil durante o
  desenvolvimento, mas em produção o recomendado é `validate`.
- O campo `conteudo` usa `columnDefinition = "LONGTEXT"` no `Post.java`
  para não truncar textos longos (erro comum: "Data too long for
  column 'conteudo'").
- Veja `DOCUMENTACAO_IA.md` para a citação obrigatória do uso de IA
  (protocolo GuardIA, item 6 do planejamento).
