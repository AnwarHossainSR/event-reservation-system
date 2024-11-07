```markdown
# Event Reservation System

This project consists of a client and server application, running with a PostgreSQL database, pgAdmin for database management, and MailHog for email testing. Follow the instructions below to get started.

## Prerequisites

- **Node.js**: Make sure you have Node.js version **20.18.0** installed on your machine Or just need to install docker. Here you can run the app by docker or without docker both.
- **Docker**: Ensure that Docker is installed and running on your machine.
- **Docker Compose**: Install Docker Compose using your preferred package manager.
```

## Project Setup with Docker

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/AnwarHossainSR/event-reservation-system.git
cd event-reservation-system
```

### Step 2: Navigate to the Server and Client Folders

You will find two folders in the cloned repository: `server` and `client`.

1. **Update .env file from server folder**:

   ```bash
   DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5433/event_reservation"
   NODE_ENV="development"
   PORT=4000
   JWT_SECRET="mdsfg$6gdf^dhfhd3gdfs453hds$hdsfh#hdgfh%fhdf_dsgfdshf^4543djfg"
   DEFAULT_SENDER_EMAIL='event-reservation@example.com'
   SMTP_HOST="mailhog"
   SMTP_PORT='1025'

   ```

2. **Run Docker**:

   ```bash
   cd event-reservation-system # Navigate to the repository root
   docker-compose up --build -d # Run the Docker Compose services in the background

   ```

3. **Use Following command one by one for database migrate and seed for admin user and normal user from root directory**:

   ```bash
   docker ps # Check the running containers

   You just need to copy the container id of the postgres container
   ```

   ```bash
   docker inspect {postgres_container_id_here_what_you_copied} | grep IPAddress
   ```

   ```bash
   docker-compose exec backend npx prisma generate
   ```

   ```bash
   docker-compose exec backend npx prisma migrate dev --name dev
   ```

   ```bash
   docker-compose exec backend yarn run seed
   ```

    ```bash
   docker-compose exec backend yarn run build
   ```

4. **Run Server , client, pgadmin and mailhog on bellow url**:

   ```bash
   Swagger docs (api) : http://localhost:4000/api-docs
   Client: http://localhost:3000
   PgAdmin: http://localhost:5050
   MailHog: http://localhost:8025

   ```

5. **Login with the credentials of admin and user**:

   ```bash
   admin creadentials
   email: admin@admin.com
   password: 123456
   ```

   ```bash
   user creadentials
   email: user@user.com
   password: 123456
   ```

## Project Setup without Docker

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/AnwarHossainSR/event-reservation-system.git
cd event-reservation-system
```

### Step 2: Navigate to the Server and Client Folders

You will find two folders in the cloned repository: `server` and `client`.

1. **Server Setup**:

   ```bash
   cd server

   ```

2. **Client Setup**:

   ```bash
   cd ../client

   ```

### Step 3: Install Dependencies

For both the server and client, run one of the following commands to install the required dependencies:

### In the Server Folder

```bash
npm install
# or
yarn install

```

### In the Client Folder

```bash
npm install
# or
yarn install

```

### Step 4: Run Docker Services

Before starting the application, you need to set up the required services using Docker.

Once the `without-docker-compose.yml` file is ready, run the following command to start the services. it will run postgres, pgadmin and mailhog.

```bash
docker-compose -f without-docker-compose.yml up --build -d

```

### Step 5: Generate prisma

Run the following command to generate the Prisma schema from server folder.

```bash
npx prisma generate

```

### Step 6: Migrate the Database

After starting the Docker services, run the following command to migrate the database using Prisma from server folder.:

```bash
npx prisma migrate dev --name dev

```

```bash
yarn run build

```

```bash
yarn run seed

```

This command will apply any pending migrations to your database. You can replace `init` with a more descriptive name for your migration if necessary.

### Step 7: Start the Application

After ensuring that Docker services are running and the database is migrated, navigate back to the `server` and `client` folders and run the following command in each folder:

### In the Server Folder

```bash
npm run dev
# or
yarn run dev

```

### In the Client Folder

```bash
npm run dev
# or
yarn run dev

```

### Access the Application

- The **backend** will be available at `http://localhost:4000`.
- The **frontend** will be available at `http://localhost:3000`.
- You can find the API documentation at: <http://localhost:4000/api-docs/>

### Using pgAdmin

To access pgAdmin, open your browser and navigate to `http://localhost:5050`. Log in with the following credentials:

- **Email**: `admin@admin.com`
- **Password**: `admin`

### Using MailHog

To view sent emails for testing, navigate to `http://localhost:8025`.
