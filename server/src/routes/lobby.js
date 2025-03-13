const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') })

const express = require('express')
const router = new express.Router()

const guestMiddleware = require('../middleware/guest')

const Lobby = require('../models/lobby');

// Search for lobby or create one
router.get('/find', guestMiddleware, async (req, res, next) => {
    try {
        let lobby = await Lobby.findOne({ isPrivate: false, startCountDown: false, $where: 'this.players.length < 4' })
        const player = req.user ? { user: req.user._id } : { guestName: 'GUEST' }
        
        let isNewLobby = false;

        if (lobby) {
            lobby.players.push(player)
        }
        else {
            lobby = new Lobby({ players: [player] })
            isNewLobby = true;
        }

        await lobby.save()

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