const mongoose = require('mongoose')
const { randomBytes } = require('crypto')

const User = require('./user');

const lobbySchema = new mongoose.Schema({
    players: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }],
        validate: {
            validator: (arr) => arr.length <= 4,
            message: 'Max 4 players in a lobby'
        }
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    startCountDown: {
        type: Boolean,
        default: false
    },
    code: {
        type: String
    }
}, {
    timestamps: true
})

// Generate lobby code
lobbySchema.pre('save', async function(next) {
    if (this.isNew) {
        this.code = randomBytes(4).toString('hex')
    }

    next()
})

const Lobby = mongoose.model('Lobby', lobbySchema)

module.exports = Lobby