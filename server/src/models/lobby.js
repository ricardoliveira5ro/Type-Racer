const mongoose = require('mongoose')

const User = require('./user');

const lobbySchema = new mongoose.Schema({
    players: [User],
    isPrivate: {
        type: Boolean,
        default: false
    },
    startCountDown: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Lobby = mongoose.model('Lobby', lobbySchema)

module.exports = Lobby