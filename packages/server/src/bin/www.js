#!/usr/bin/env node

import app, { PORT } from '../app'
import debug from 'debug'
import http from 'http'

debug('server:server')

const server = http.createServer(app)

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

server.listen(PORT)
server.on('error', console.error)
server.on('listening', onListening)
