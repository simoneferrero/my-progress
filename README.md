# My Progress

An application to simplify the recording of daily progress, accomplishments, and things of note.

It consists of a React client, NodeJS server and MySQL database.

## Environment variables

At this time (it may be changed in the future), you need to create a `.env` file at the root of the project AND at the root of each package, with the following contents:

```
SERVER_PORT=7000 # your server's port

DB_HOST=localhost # the host of your database
DB_CONNECTION_LIMIT=10 # how many concurrent connections the server will accept

MYSQL_ROOT_PASSWORD=password # database root password
MYSQL_DATABASE=my-progress # database name
MYSQL_USER=simone # database user
MYSQL_PASSWORD=password # database user password

# client only
REACT_APP_SERVER_PORT=7000 # your server's port
REACT_APP_SERVER_HOST=http://localhost # the host of your server

SKIP_PREFLIGHT_CHECK=true # create-react-app uses its own version of eslint and complains if installed elsewhere
```

## Running the application in development

Currently, only the database is dockerized.

To start the application, run the following scripts from the root folder in different terminals (`migrate:up` can be run only after `start:db` and the database is up)

- `yarn start:db`: Start the database and an instance of adminer, which allows to see the contents of the db in a browser window at `localhost:9080`
- `yarn migrate:up`: Run the set of migrations on the database
- `yarn start:server`: Start the server
- `yarn start:client`: Start the client
