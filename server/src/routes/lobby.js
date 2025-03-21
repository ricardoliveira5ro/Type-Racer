const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') })

const express = require('express')
const router = new express.Router()

const guestMiddleware = require('../middleware/guest')

const Lobby = require('../models/lobby');
const Quote = require('../models/quote');

const { handleOnUserLeave } = require('../utils/functions')

// Solo lobby
router.get('/practice', guestMiddleware, async (req, res, next) => {
    try {
        const quotesCount = await Quote.countDocuments({}, { hint: "_id_" })
        const random = ~~(Math.random() * quotesCount)

        const quote = await Quote.findOne().skip(random)

        const player = { user: req.headers['x-socket-id'], playerName: req.user?.username || 'Guest', wpm: 0, wordIndex: 0 }
        const lobby = new Lobby({ isPrivate: true, startCountDown: true, players: [player], quote: quote })

        await lobby.save()
        lobby.quote = lobby.quote.toJSON()

        res.send({ lobby: lobby })

    } catch (e) {
        next(e)
    }
})

// Search for lobby or create one
router.get('/find', guestMiddleware, async (req, res, next) => {
    try {
        let lobby = await Lobby.findOne({ 
            isPrivate: false, 
            startCountDown: false, 
            players: { $not: { $elemMatch: { user: req.headers['x-socket-id'] } } }, 
            $where: 'this.players.length < 4' 
        }).populate('quote')

        const player = { user: req.headers['x-socket-id'], playerName: req.user?.username || 'Guest', wpm: 0, wordIndex: 0 }

        let isNewLobby = false;

        if (lobby) {
            lobby.players.push(player)
        }
        else {
            const quotesCount = await Quote.countDocuments({}, { hint: "_id_" })
            const random = ~~(Math.random() * quotesCount)

            const quote = await Quote.findOne().skip(random)
            
            lobby = new Lobby({ players: [player], quote: quote })
            isNewLobby = true;
        }

        await lobby.save()
        lobby.quote = lobby.quote.toJSON()

        res.send({ lobby: lobby })

        const socket = req.app.get('socketIO')
        socket.to(lobby.code).emit('playerJoined', { lobby })

        if (isNewLobby) {
            startTimeFrameWindowToJoin(lobby._id, socket)
        }

    } catch (e) {
        next(e)
    }
})

const startTimeFrameWindowToJoin = (lobbyId, socket) => {
    setTimeout(async () => {
        try {
            // Fetch the lobby again because of new players
            const lobby = await Lobby.findById(lobbyId)

            if (!lobby || lobby.startCountDown) return;

            lobby.startCountDown = true
            await lobby.save()

            socket.to(lobby.code).emit('countdown-started', { lobby })

        } catch (e) {
            console.log(e)
        }
    }, 10000) // 10 seconds
}

router.post('/:code', async (req, res, next) => {
    const socketID = req.headers['x-socket-id']
    const code = req.params.code

    const lobby = await Lobby.findOne({ code: code })

    if (!lobby) return

    await handleOnUserLeave(lobby, socketID)

    res.send({ message: "Successfully deleted or updated" })
})

module.exports = router