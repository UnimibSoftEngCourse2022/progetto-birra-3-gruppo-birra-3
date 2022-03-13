# Progetto Birra 3

<a href="https://angular.io/">
    <img src="https://img.shields.io/badge/-Angular-informational?style=flat&logo=angular&logoColor=white&labelColor=d6012f&color=5d5d5d" height="25">
</a>

<a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/-Node.js-informational?style=flat&logo=Node.js&logoColor=white&labelColor=339933&color=5d5d5d" height="25">
</a>

<a href="https://expressjs.com/it/">
    <img src="https://img.shields.io/badge/-Express.js-informational?style=flat&logo=Express&logoColor=white&labelColor=259dff&color=5d5d5d" height="25">
</a>

<a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/-MongoDB-informational?style=flat&logo=mongodb&logoColor=white&labelColor=47A248&color=5d5d5d" height="25">
</a>

<a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/-Docker-informational?style=flat&logo=docker&logoColor=white&labelColor=2391e6&color=5d5d5d" height="25">
</a>

## Prerequisiti

Per avviare il progetto l'unico prerequisito è avere Docker. 
Se non presente sul proprio computer clicca link per scaricare Docker Desktop.

<a href="https://www.docker.com/products/docker-desktop">
    <img src="https://img.shields.io/badge/-Scarica Docker Desktop-informational?style=flat&logo=docker&logoColor=white&labelColor=5d5d5d&color=5d5d5d" height="25">
</a>

# Init Progetto

Una volta installato e avviato Docker Desktop è ora di far partire il progetto.

Dentro la `root` del progetto avviare da terminale il seguente comando:

```bash
docker-compose up --build
```

Invece in alternativa se si vuole avviare in backgroud esequire il seguente comando:

```bash
docker-compose up --build -d
```

## Stop Esecuzione 

Per fermare l'esecuzione di tutti i container del progetto:

```bash
docker-compose down
```

Se si ha bisogno di fermare e rimuovere tutti i contenitori, le reti e tutte le immagini utilizzate da qualsiasi
servizio nel file <em>docker-compose.yml</em>, utilizzate il seguente comando:

```bash
docker-compose down --rmi all
```

## Link

- Frontend Url: (http://localhost:8000/)
- Backend Api Url: (http://localhost:6868/api/)
- Visualizzare i vari env di configurazione (./.env)


[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=UnimibSoftEngCourse2022_progetto-birra-3-gruppo-birra-3)
