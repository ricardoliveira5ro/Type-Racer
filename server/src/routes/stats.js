const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env') })

const express = require('express')
const router = new express.Router()

const jwtMiddleware = require('../middleware/jwt')
const authMiddleware = require('../middleware/auth')

const AppError = require('../errors/Error');

const User = require('../models/user');
const UserStats = require('../models/userStats');

// Update user stats
router.put('/post-race', [jwtMiddleware, authMiddleware], async (req, res, next) => {
    try {
        const stats = await UserStats.findOne({ user: req.user._id })

        const newStats = await UserStats.findOneAndUpdate({ user: req.user._id }, {
            races: stats.races + 1,
            wins: req.body.position === 1 ? stats.wins + 1 : stats.wins,
            accuracy: stats.races === 0 ? ~~req.body.accuracy : ~~(((stats.accuracy * stats.races) + req.body.accuracy) / (stats.races + 1)),
            wpm: stats.races === 0 ? ~~req.body.wpm : ~~(((stats.wpm * stats.races) + req.body.wpm) / (stats.races + 1)),
            wpmLast10Races: [
                ...((stats.wpmLast10Races || []).length >= 10 ? stats.wpmLast10Races.slice(1) : stats.wpmLast10Races || []),
                ~~req.body.wpm
            ],
            accuracyLast10Races: [
                ...((stats.accuracyLast10Races || []).length >= 10 ? stats.accuracyLast10Races.slice(1) : stats.accuracyLast10Races || []),
                ~~req.body.accuracy
            ],
            bestRaceWPM: req.body.wpm > stats.bestRaceWPM ? ~~req.body.wpm : ~~stats.bestRaceWPM,
            lastRaceWPM: ~~req.body.wpm
            
        }, { new: true, upsert: true })

        const user = req.user.toJSON()
        user.stats = newStats.toJSON()

        res.send({ user: user })

    } catch (e) {
        next(e)
    }
})

module.exports = router