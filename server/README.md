<br />
<h1> Backend - Mural digital </h1>
<br />

## Tecnologias usadas

- [Typescrypt](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Json Web Tokens](https://jwt.io/)
- [Celebrate](https://www.npmjs.com/package/celebrate)
  
<br />

## Como rodar o projeto

A priori você deve ter um banco de dados mongodb ou conta no mongodb atlas. 
Dito isso, você deve configurar o arquivo .env deste projeto. 

Definir a string de conexão ao banco de dados no caminho ./src/server.ts na variavel URI. 
Entre no diretório onde este arquivo README.md esta localizado, abra o terminal e execute 
a lista de comandos a seguir:

- yarn ou npm
- yarn dev

<br />
Observe a saida no terminal para verificar se o sistema esta rodando perfeitamente.

Para efetuar os testes com as requisições utilize o arquivo [insomnia](./mural-digital-insomnia-file.json)
você pode adquirir o insomnia app [aqui](https://insomnia.rest/download/)

<br />

## Rotas

### Rotas dos usuarios

#### Listar todos

`GET /users`

`BODY: NENHUM`
`HEADER: NENHUM`

#### Procurar usuario

`GET /users/:id`

`BODY: NENHUM`
`HEADER: NENHUM`

#### Cadastro

`POST /users`

`BODY: {"email": "email", "password": "password"}`
`HEADER: { authentication: Bearer token }`

#### Atualizar

`UPDATE /users`

`BODY: {"email": "email", "password": "password"}`
`HEADER: { authentication: Bearer token }`

#### Remover

`DELETE /users/:id`

`BODY: NENHUM`
`HEADER: { authentication: Bearer token }`

<br />

### Autenticação de usuarios

#### Checar autenticacao

`POST /auth`

`BODY: NENHUM`
`HEADER: { authentication: Bearer token }`

#### Autenticar usuario

`POST /auth`

`{"email": "email", "password": "password"}`

<br />

### Rotas dos anuncios

#### Listar todos

`GET /billboard`

`BODY: NENHUM`
`HEADER: NENHUM`

#### Procurar anuncio

`GET /users/:id`

`BODY: NENHUM`
`HEADER: NENHUM`

#### Cadastro anuncio

`POST /billboard`

`BODY: {"title": "Title", "extendedTitle": "Extended title", "imageUr": "http://dominio.com/", "text": "Um texto qualquer so pra encher o saco!"}`
`HEADER: { authentication: Bearer token }`

#### Atualizar

`UPDATE /billboard`

`BODY: {"title": "Title", "extendedTitle": "Extended title", "imageUr": "http://dominio.com/", "text": "Um texto qualquer so pra encher o saco!"}`
`HEADER: { authentication: Bearer token }`

#### Remover

`DELETE /billboard/:id`

`BODY: NENHUM`
`HEADER: { authentication: Bearer token }`

<br />

### Uploads

#### Listar imagens

`GET /uploads`

`BODY: NENHUM`
`HEADER: NENHUM`

<br />

### Notificações (NO APP)

#### Gerar notificações à todos os apps

`GET /tokens/notify`

`BODY: NENHUM`
`HEADER: NENHUM`

#### Listar todos os tokens cadastrados

`GET /tokens`

`BODY: NENHUM`
`HEADER: NENHUM`

#### Cadastrar token

`POST /tokens`

`BODY: { "data": "ExponentPushToken[sad121v12b21421bs]", "type":  " " `
`HEADER: NENHUM`

<br />

#### EXPO notification (terceiros)

`POST /tokens`

`BODY: {"to": "ExponentPushToken[sad121v12b21421bs]", "sound": "default", "title": "Mural Digital", "body": "Novo anuncio!", "data": {"data": "Alguma data aqui"}`
`HEADER: NENHUM`

#### Cadastrar token

`POST /tokens`

`BODY: { "data": "ExponentPushToken[sad121v12b21421bs]", "type":  " " `
`HEADER: NENHUM`

<br />

## Banco de dados:

`Foi utilizado MongoDB como banco de dados.`

- [MongoDB](https://cloud.mongodb.com/v2#/org/5fbd15975945d417c83269d4/projects)

## Criptografia

#### Foi utilizado BCrypt como ferramente de criptografia dos dados.
