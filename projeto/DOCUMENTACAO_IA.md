# Documentação de uso de IA — Protocolo GuardIA (item 6)

**Ferramenta:** Claude (Anthropic), modelo Claude Sonnet 5, via chat web.

**Prompt inicial:** pedido para seguir o roteiro *"Desenvolvimento de API REST com Spring Boot e MySQL"* e auxiliar na implementação e estruturação do projeto em Spring Boot, integrando o front-end (`index.html`, `script.js` e `style.css`) já existente a um novo back-end, utilizando o script de banco de dados (`BD_BLOGPOST.sql`) como base.

**O que a IA gerou:** orientações para a estruturação do projeto em Spring Boot, sugestões de implementação da API REST, auxílio na configuração do projeto (CORS, `application.properties` e integração com o banco de dados) e exemplos de código utilizados como base para algumas classes e para a adaptação do `script.js` ao uso de `fetch()`.

**O que o grupo fez:** forneceu o front-end e o script de banco de dados utilizados, desenvolveu e adaptou as classes do projeto (`Controller`, `Model` e `Repository`), integrou o front-end ao back-end, revisou e ajustou as sugestões fornecidas pela IA, executou o projeto, testou os endpoints no Postman, identificou e corrigiu dois erros reais em tempo de execução (coluna `conteudo` com tamanho insuficiente e requisição `PUT` sem corpo configurado no Postman) e validou o funcionamento completo do CRUD antes da entrega.

**Divisão de autoria:** a IA foi utilizada como ferramenta de apoio para orientar a estrutura e a implementação do projeto em Spring Boot, fornecendo sugestões de configuração e exemplos de código. O desenvolvimento do front-end, do banco de dados, das classes principais da aplicação, da integração entre as camadas, dos testes e da correção dos erros foi realizado pelo grupo.
