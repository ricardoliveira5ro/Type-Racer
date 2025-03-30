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

const Lobby = require('./models/lobby')

const { handleOnUserLeave } = require('./utils/functions')

require("dotenv").config({ path: path.resolve(__dirname, './config/.env') });

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

const options = {};
if (process.env.NODE_ENV === "development") {
    options.cors = {
        origin: "http://localhost:3000",
        credentials: true
    };
}

const io = new Server(server, options)

// Socket rooms connection
io.on('connection', (socket) => {

    // Listen for the client to join a room
    socket.on('joinRoom', (lobbyCode) => {
        socket.join(lobbyCode);
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

    // Left custom lobby
    socket.on("player-left-custom", async (data) => {
        const { lobby: lobbyData, user } = data

        const lobby = await Lobby.findOne({ code: lobbyData.code })

        if (!lobby) return

        lobby.players = lobby.players.filter(player => player.user !== user)
        await lobby.save()

        socket.broadcast.emit('player-disconnected', { lobby });
    })

    // Handle disconnection
    socket.on('disconnect', async () => {
        const lobbies = await Lobby.find({ "players.user": socket.id })

        for (const lobby of lobbies) {
            if (lobby.isPrivate && !lobby.startCountDown && lobby.players.length > 1) {
                lobby.players = lobby.players.filter(player => player.user !== socket.id)
                await lobby.save()

                socket.broadcast.emit('player-disconnected', { lobby });
            }
            else {
                await handleOnUserLeave(lobby, socket.id)
            }
        }
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