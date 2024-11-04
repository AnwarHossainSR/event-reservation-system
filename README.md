```markdown
# Event Reservation System

This project consists of a client and server application, running with a PostgreSQL database, pgAdmin for database management, and MailHog for email testing. Follow the instructions below to get started.

## Prerequisites

- **Node.js**: Make sure you have Node.js version **20.18.0** installed on your machine.
- **Docker**: Ensure that Docker is installed and running on your machine.
- **Docker Compose**: Install Docker Compose using your preferred package manager.
```

## Project Setup

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

Once the `docker-compose.yml` file is ready, run the following command to start the services. it will run postgres, pgadmin and mailhog.

```bash
docker-compose up -d

```

### Step 5: Migrate the Database

After starting the Docker services, run the following command to migrate the database using Prisma:

```bash
npx prisma migrate dev --name init

```

This command will apply any pending migrations to your database. You can replace `init` with a more descriptive name for your migration if necessary.

### Step 6: Start the Application

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
