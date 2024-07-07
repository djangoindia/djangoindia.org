## Using Docker

### Starting Services

#### Starting Both Services

```bash
docker-compose up --build
```

This command starts both frontend and backend services defined in `docker-compose.yml`.

#### Starting Frontend Only

```bash
docker-compose up frontend
```

This command starts only the frontend service defined in `docker-compose.yml`.

#### Starting Backend Only

```bash
docker-compose up backend
```

This command starts only the backend service defined in `docker-compose.yml`.

---

Use these commands based on your need to start both, frontend only, or backend only services using Docker Compose.