const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') })

const express = require('express')
const router = new express.Router()

const guestMiddleware = require('../middleware/guest')

const Lobby = require('../models/lobby');
const Quote = require('../models/quote');

// Search for lobby or create one
router.get('/find', guestMiddleware, async (req, res, next) => {
    try {
        let lobby = await Lobby.findOne({ isPrivate: false, startCountDown: false, $where: 'this.players.length < 4' }).populate('quote')
        const player = req.user ? { user: req.user._id, playerName: req.user.username } : { playerName: 'Guest' }
        
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
        socket.emit('playerJoined', { lobby })

        // Just for now
        // if (isNewLobby) {
        //     startTimeFrameWindowToJoin(lobby._id)
        // }

    } catch (e) {
        next(e)
    }
})

const startTimeFrameWindowToJoin = (lobbyId) => {
    setTimeout(async () => {
        try {
            // Fetch the lobby again because of new players
            const lobby = await Lobby.findById(lobbyId)

            if (!lobby || lobby.startCountDown) return;

            lobby.startCountDown = true
            await lobby.save()

            // Notify all the players in the lobby (Send to frontend)
            // notify()

        } catch (e) {
            console.log(e)
        }
    }, 10000) // 10 seconds
}

module.exports = router