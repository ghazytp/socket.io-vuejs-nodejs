const express = require('express')
// const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const port = 3000

// * CREATE EXPRESS SERVER
const app = express()

// * CREATE HTTP MODULES SERVER
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// app.use(cors())

// * SOCKET.IO LISTENERS
io.on('connection', (socket) => {
    console.log(`user ${socket.id} has been connected`);

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left`);
    })

    socket.on('message', (data) => {

        // broadcasting message to all connected client
        io.emit('messageReceived', data)
    })
})

// * HTTP MODULES SERVER LISTEN
server.listen(port, () => {
    console.log(`HTTP SERVER RUNNING ON http://localhost:${port}`);
})

