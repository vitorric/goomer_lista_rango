
# Goomer Lista Rango API

  

API do Goomer Lista Rango, desenvolvida em NodeJS juntamente com o MongoDB.

  

# Estrutura da API

- O fluxo da API é: rota -> serviço -> repositório -> model

- Para cada rota existe um serviço exclusivo, para que assim, se houver problema em alguma rota, aconteça isoladamente.

- Os repositórios podem ser usados por 1 ou mais serviço.

- Para acessar a API, é necessário um token de autenticação JWT.

- A nomeção das rotas é feita da seguinte forma: /api/tipo_token/servico/metodo. O tipo_token seria os donos do token, por exemplo, uma rota exclusiva para usuário restaurante e outra exclusiva para usuário cliente.

  

# Configuração do Ambiente

- Instale o [NodeJS](https://nodejs.org/en/);

- Instale o [Git](https://git-scm.com/downloads)

- Instale o [MongoDB](https://www.mongodb.com/try/download/community)

  

Instale o [nodemon](https://www.npmjs.com/package/nodemon) para rodar a API, para isso, abra o terminal e rode o seguinte comando:

  

`npm i g nodemon`

  

# Iniciar API

1) Faça o clone do projeto

2) Vá até o diretório aonde foi feito o clone, e no terminal, rode o comando:

`npm install`

3) Após o termino da instalação dos pacote, crie um arquivo chamado **.env.local** abra ele e insira os parâmetros de configuração da API. Use o arquivo **.env.example** como base.

4) Feito isso, basta iniciar a API, usando os comandos:

`NODE_ENV=local nodemon` - para rodar em ambiente localhost

  

# Documentação

Execute o comando `apidoc -i src/ -o apidoc/` para gerar a documentação da API. O arquivo da documentação é um **index.html** fica dentro da pasta **apidoc**

# Testes

Para realizar o teste da API, execute o comando:

`npm run test`

Para realizar um teste de cobertura, execute o comando:

`npm run test-cover`

Abra o **index.html** dentro da pasta **covarage** pra verificar o que de código foi testado

Abra o **index.html** dentro da pasta **mochawesome-report** para verificar detalhadamente os testes rodados.

# Arquivo Postman

Dentro da pasta **docs** existe um arquivo JSON que pode ser importado no postman, nele há os exemplos de requisições.

# Desafios/Problemas

- Um dos desafios para mim foi a implementação dos testes unitários, por não ser acostumado a fazer por falta de tempo no dia a dia.

- Um dos problemas foi o retorno das requisições, normalmente eu construo uma rota baseado no que o front espera receber.

  

# Melhorias

- Upload das imagens irem para uma CDN em vez do GridFS;

- Retorno das rotas ser baseada no que o front espera;

- Criar rotas com serviços mais simples, principalmente o de atualização;

- Em vez de deletar os restaurante e produtos, apenas desativá-los;

- Receber a senha do usuário encriptada pelo front-end;

- Utilização de socket e/ou firebase para a disparar os triggers de promoções de produtos para o front (seja WEB ou mobile).