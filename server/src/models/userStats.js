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
    wpmLast10Races: [{
        type: Number,
        default: 0
    }],
    wpmLast10RacesAvg: {
        type: Number,
        default: 0
    },
    accuracyLast10Races: [{
        type: Number,
        default: 0
    }],
    accuracyLast10RacesAvg: {
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

userStatsSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate()

    if (update.wpmLast10Races) {
        const avg = update.wpmLast10Races.reduce((sum, currentValue) => sum + currentValue, 0) / update.wpmLast10Races.length
        update.wpmLast10RacesAvg = ~~avg
    }

    if (update.accuracyLast10Races) {
        const avg = update.accuracyLast10Races.reduce((sum, currentValue) => sum + currentValue, 0) / update.accuracyLast10Races.length
        update.accuracyLast10RacesAvg = ~~avg
    }

    next()
})

const UserStats = mongoose.model('UserStats', userStatsSchema)

module.exports = UserStats