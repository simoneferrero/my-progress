# My Progress

An application to simplify the recording of daily progress, accomplishments, and things of note.

It consists of a React client, NodeJS server and MySQL database.

At this time (it may be changed in the future), you need to create a `.env` file at the root of the project, as well as each package, with the following contents:

```
SERVER_PORT=7000 # your server's port

DB_HOST=localhost # the host of your database
DB_CONNECTION_LIMIT=10 # how many concurrent connections the server will accept

MYSQL_ROOT_PASSWORD=password # database root password
MYSQL_DATABASE=my-progress # database name
MYSQL_USER=simone # database user
MYSQL_PASSWORD=password # database user password
```

Currently, only the database is dockerized.

`yarn start:db`: Start the database and an instance of adminer, which allows to see the contents of the db in a browser window at `localhost:9080`
`yarn migrate:up`: Run the set of migrations on the database
`yarn start:server`: Start the server
