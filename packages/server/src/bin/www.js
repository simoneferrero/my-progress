#!/usr/bin/env node

import debug from 'debug'
import http from 'http'

import app from '../app'
import definitions from '../utils/definitions'

debug('server:server')

const server = http.createServer(app)
const { PORT } = definitions

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

server.listen(PORT)
server.on('error', console.error)
server.on('listening', onListening)
