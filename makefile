# Backend commands
VENV := backend/venv
PYTHON := $(VENV)/bin/python
PIP := $(VENV)/bin/pip

# Load environment variables from .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

create-venv:
	python3 -m venv $(VENV)

install-backend: create-venv
	$(PIP) install -r backend/requirements/local.txt

migrations: install-backend
	$(PYTHON) backend/manage.py makemigrations

migrate: install-backend
	$(PYTHON) backend/manage.py migrate

runserver: install-backend
	$(PYTHON) backend/manage.py runserver

superuser: install-backend
	$(PYTHON) backend/manage.py createsuperuser

collectstatic: install-backend
	$(PYTHON) backend/manage.py collectstatic --no-input

# PostgreSQL and RabbitMQ commands
start-postgres:
	docker run --name postgres -e POSTGRES_DB=$(POSTGRES_DB) -e POSTGRES_USER=$(POSTGRES_USER) -e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) -p $(POSTGRES_PORT):5432 -v postgres_data:/var/lib/postgresql/data -d postgres

stop-postgres:
	docker stop postgres || true
	docker rm postgres || true

start-rabbitmq:
	docker run --name rabbitmq -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management

stop-rabbitmq:
	docker stop rabbitmq || true
	docker rm rabbitmq || true


# Frontend commands
install-frontend:
	cd frontend && npm install

build-frontend:
	cd frontend && npm run build

run-frontend:
	cd frontend && npm run dev

# Combined commands
start-services: stop-postgres stop-rabbitmq start-postgres start-rabbitmq

stop-services: stop-postgres stop-rabbitmq

backend: install-backend migrations migrate runserver

frontend: install-frontend builamid-frontend run-frontend

.PHONY: create-venv install-backend migrations migrate runserver superuser collectstatic install-frontend build-frontend run-frontend backend frontend start-services stop-services