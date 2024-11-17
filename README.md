# bothub backend

## Project Setup and Usage

This guide will help you set up and run the project locally using Docker.

### Prerequisites

Before getting started, ensure that you have the following tools installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setup

1. **Clone the Repository**

   Clone the project repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Environment Variables**

Create a .env file from the provided .env.example template:

```bash
 cp .env.example .env
```

This will create a copy of the environment configuration that the application uses.

3. **Start the Application**

Use Docker Compose to build and start the application:

```bash
docker-compose up --build
```

This command will pull the required Docker images, build the application container, and start the application.
Once the containers are running, the application will be available at:

• API: http://localhost:3000/api
• Swagger UI Documentation: http://localhost:3000/swagger

### Accounts

Добавлены три пользователя

1.  login: superadmin, password: bothubTest1! role: superadmin
2.  login: admin, password: bothubTest1! role: admin
3.  login: stutzen, password: bothubTest1! role: client

В приложении присутствуют мультиязычные ошибки, на EN и RU, можно в заголовке передать, можно в строке, либо в доп куке

Additional Notes

• Make sure to check the Swagger UI for API documentation and testing: http://localhost:3000/swagger.
• The API is accessible via the /api endpoint.

## Migrations

- name - имя миграции
- каталог указывать не надо, создастся автоматически по пути `./src/database/migrations/`

```bash
# Create migration from entities
$ npm run migration:generate --name=init-db

# Create empty migration
$ npm run migration:create --name=create-user

# Manually starting migration
$ npm run migration:run
```
