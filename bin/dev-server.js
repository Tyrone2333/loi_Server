#!/usr/bin/env node

// import  wsServer from "../websocket/chatRoom"

/**
 * Module dependencies.
 */
require('babel-core/register')
require("babel-core").transform("code", {
    plugins: ["transform-runtime"]
})

var config = require('../config')

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var port = process.env.PORT || config.dev.port


var app = require('../app')
var debug = require('debug')('server:server')
var http = require('http')


/**
 * Get port from environment and store in Express.
 */

// var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    debug('Listening on ' + bind)
}


// socket.io    BEGIN
const io = require('socket.io')(server);
// 导入聊天室
const ioSvc = require("../websocket/chatRoom/index").ioServer(io);
// socket.io    END

/**
 * Listen on provided port, on all network interfaces.
 */
let url = 'http://' + getIPAddress() + ':' + port

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

log("现在正在 " + process.env.NODE_ENV + " 模式")
log('> Listening at ' + url + '\n')