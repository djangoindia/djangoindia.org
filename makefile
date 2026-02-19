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

# Frontend commands
install-frontend:
	cd frontend && npm install

run-frontend:
	cd frontend && npm run dev

backend: install-backend migrations migrate runserver

frontend: install-frontend run-frontend

.PHONY: create-venv install-backend migrations migrate runserver superuser collectstatic install-frontend run-frontend backend frontend 