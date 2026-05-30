# Calculadora com API

Este projeto faz parte de um trabalho da diciplina de Back-end onde o objetivo é construir uma API de uma calculadora utilizadno Java e Docker.

## Rodando o Projeto

### Realizar o build do container:
```
docker build --no-cache -t minha-api-java .
```

### Subir o container:
```
docker run -d -p 8080:8080 --name api-container minha-api-java
```

### Abrir o Front-end
  
Instale a extenção `Live Server` do VSCode, clique com o botão direito do mouse no arquivo frontend/index.html e selecione `Open with Live Server`
