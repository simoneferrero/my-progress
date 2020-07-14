import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import mysql from 'mysql2/promise'

import definitions from './utils/definitions'

import indexRouter from './routes/index'
import entriesRouter from './routes/entries'

const app = express()

const { DB, NODE_ENV } = definitions

export const PORT = process.env.PORT || '7000'

let pool

try {
  app.use(logger(NODE_ENV === 'development' ? 'dev' : 'tiny'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.set('port', PORT)

  app.use(async function (req, res, next) {
    if (!pool) {
      pool = await mysql.createPool({
        host: DB.HOST,
        user: DB.USER,
        password: DB.PASSWORD,
        database: DB.DATABASE,
        waitForConnections: true,
        connectionLimit: DB.CONNECTION_LIMIT,
        queueLimit: 0,
      })
    }
    res.locals.pool = pool

    next()
  })

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )
    next()
  })

  app.use('/', indexRouter)
  app.use('/entries', entriesRouter)

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(500).json({ error: err })
  })
} catch (e) {
  console.error(e) // eslint-disable-line no-console
}

export default app
