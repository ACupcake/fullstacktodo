# Full stack Todo List

![Login print](https://raw.githubusercontent.com/nasserso/fullstacktodo/main/todo-frontend/static/images/login.png)
![Home print](https://raw.githubusercontent.com/nasserso/fullstacktodo/main/todo-frontend/static/images/home.png)


# Starting the project

## Backend

In the project directory, enter in the backend directory:

`cd todo_backend`

Start the environment (optional)

```
virtualenv venv
. venv/bin/activate
```

Install the packages

`pip install -r requirements.txt`

(Optional) Apply migrations if it is the first time runnning

`python manage.py migrate`

Run the server

`python manage.py runserver`

## Frontend

In the project directory, enter in the frontend directory:

`cd todo_frontend`

Install the packages

`npm install`

Run the server

`npm start`

