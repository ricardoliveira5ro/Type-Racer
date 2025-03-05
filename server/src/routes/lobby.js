const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') })

const express = require('express')
const router = new express.Router()

const guestMiddleware = require('../middleware/guest')

const Lobby = require('../models/lobby');

// Search for lobby or create one
router.get('/find', guestMiddleware, async (req, res, next) => {
    try {
        const availableLobby = await Lobby.findOne({ isPrivate: false, startCountDown: false, $where: 'this.players.length < 4' })
        
        if (availableLobby) {
            req.user ? availableLobby.players.push({ user: req.user._id })
                    : availableLobby.players.push({ guestName: 'GUEST' })
            await availableLobby.save()

        } else {
            
            if (req.user)
                newLobby = new Lobby({ players: [{ user: req.user._id }] })
            else
                newLobby = new Lobby({ players: [{ guestName: 'GUEST' }] })

            await newLobby.save()
        }

        res.send({ lobby: availableLobby || newLobby })

    } catch (e) {
        next(e)
    }
})

module.exports = router