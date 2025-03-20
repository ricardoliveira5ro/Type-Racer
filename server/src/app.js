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

// Socket rooms connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for the client to join a room
    socket.on('joinRoom', (lobbyCode) => {
        socket.join(lobbyCode);
        console.log(`User ${socket.id} joined room ${lobbyCode}`);
    });

    // Listen for words typed
    socket.on("word-typed", (data) => {
        const { lobby, update } = data

        const updatedPlayers = lobby.players.map(player =>
            player.user === update.socketID
                ? { ...player, wpm: update.wpm, wordIndex: update.wordIndex, hasFinished: update.hasFinished }
                : player
        );

        const updatedLobby = { ...lobby, players: updatedPlayers }

        socket.to(lobby.code).emit("player-progress", { lobby: updatedLobby })
    })

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
})

app.set('socketIO', io);

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