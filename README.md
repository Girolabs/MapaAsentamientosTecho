# MapaAsentamientosTecho
Mapa de asentamientos informales de Techo Paraguay

## Requerimientos

- Python 3.8 o superior.
- Pipenv para manejo del entorno virtual `sudo apt install pipenv`.
- PostgreSQL para manejo de base de datos:

  ```bash
    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install libpq-dev python3-dev
  ```

## Instrucciones

### Iniciar el servidor de desarrollo

1. Crear la base de datos y el usuario en PostgreSQL para el proyecto con los siguientes datos:

  ```text
    nombre BD: mapaasentamientostecho,
    user: mapaasentamientostecho,
    password: mapaasentamientostecho
  ```

2. Instalar las dependencias `pipevn install`.
3. Correr el entorno virtual `pipenv shell`.
4. Correr las migraciones `python manage.py migrate`.
5. Crear super usuario `python manage.py createsuperuser`.
6. Correr el servidor `python manage.py runserver`.
7. Para extraer los datos de producción `python manage.py dumpdata main > main.json`.