const path = require('path')
const http = require('http')
const cookieParser = require('cookie-parser');
const express = require('express')
const { Server } = require("socket.io");

const globalErrorHandler = require('./middleware/errorHandler')

const seedData = require('./seed/seed');

const userRoutes = require('./routes/user')
const statsRoutes = require('./routes/stats')
const lobbyRoutes = require('./routes/lobby')

require("dotenv").config({ path: path.resolve(__dirname, './config/.env.dev') });
require('./db/mongoose')

const app = express()

const cors = require('cors');

if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
}

app.use(cookieParser())
app.use(express.json());

const server = http.createServer(app)

// Seed data
seedData()

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

app.set('socketIO', io);
io.on('connect', socket => {
    socket.emit('id', socket.id) // send each client their socket id to use in route socket.broadcast.emit() instead of io.emit()
})

// API routes
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/lobby', lobbyRoutes);

// Error Handler
app.use(globalErrorHandler)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// Handler for React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

module.exports = server