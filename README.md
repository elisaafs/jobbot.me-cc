# Simple Blog

## Frontend

This is based on `create-react-app`.

- `npm start`: run the frontend development server
- `npm build`: build the static frontend files

## Backend

This application requires PostgreSQL. Setup:

- run the shell command `createdb jobbot-cc`
- in a PostgreSQL shell run the commands from the file `./backend/database/schema.sql`
- create a file `.env` in the main folder that looks as follows and fill in the PostgreSQL database user and password:

```
DB_USER=<user name>
DB_PASSWORD=<password>
```

Run the backend server:

- `npm run start-server`: start the backend server
