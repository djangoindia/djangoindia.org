migrations:
	python3 backend/manage.py makemigrations

migrate:
	python3 backend/manage.py migrate

runserver:
	python3 backend/manage.py runserver

install-backend:
	pip3 install -r backend/requirements.txt

superuser:
	python3 backend/manage.py createsuperuser
