const mongoose = require('mongoose')

const userStatsSchema = new mongoose.Schema({
    races: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    accuracy: {
        type: Number,
        default: 0
    },
    wpm: {
        type: Number,
        default: 0
    },
    wpmLast10Races : {
        type: Number,
        default: 0
    },
    accuracyLast10Races: {
        type: Number,
        default: 0
    },
    bestRaceWPM: {
        type: Number,
        default: 0
    },
    lastRaceWPM: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const UserStats = mongoose.model('UserStats', userStatsSchema)

module.exports = UserStats