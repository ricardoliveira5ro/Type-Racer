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
        
        if (lobby)
            lobby.players.push(player)
        else
            lobby = new Lobby({ players: [player] })

        await lobby.save()

        res.send({ lobby: lobby })

    } catch (e) {
        next(e)
    }
})

module.exports = router