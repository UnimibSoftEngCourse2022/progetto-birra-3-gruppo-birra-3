# Progetto Birra 3

## Init System

Requisiti per la prof:

- Docker

Requisiti per gli sviluppatori:

- Docker
- nodejs
- npm
- Angular CLI
- Ide consigliato: Vs Code

Per far partire il progetto:

```bash
docker-compose up --build
```

Per avviare Docker in backgroud:

```bash
docker-compose up --build -d
```

## Stop System

Per stoppare i container del il progetto:

```bash
docker-compose down
```

Se avete bisogno di fermare e rimuovere tutti i contenitori, le reti e tutte le immagini utilizzate da qualsiasi servizio nel file <em>docker-compose.yml</em>, utilizzate il comando

```bash
docker-compose down --rmi all
```

## Per sviluppo locale

Una volta pronto l'ambiente, per sviluppare in locale e provare le modifiche usare i seguenti comandi:

```bash
cd frontend
npm install
```

e poi finita l'installazione dei pacchetti

```bash
ng serve -o
```

Poi per vedere il progetto in locale (http://localhost:4200/)

## Per la build locale con Docker

```bash
docker-compose up --build -d
```

## Per la build locale senza Docker

```bash
ng build
```

## Link

- Istanza Locale Develop: (http://localhost:4200/)
- Istanza Build: (http://localhost:8000/)
- Backend Api: (http://localhost:6868/api/)
- Visualizzare i vari env di configurazione (./.env)
