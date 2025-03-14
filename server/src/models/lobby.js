const mongoose = require('mongoose')
const { randomBytes } = require('crypto')

// Players can be registered users or guests
const playerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // null = Guest
    playerName: { type: String, default: 'Guest' }
}, { _id: false });

const lobbySchema = new mongoose.Schema({
    players: {
        type: [playerSchema],
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
    },
    quote: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quote'
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

// Model custom JSON 
lobbySchema.methods.toJSON = function () {
    const lobbyObject = this.toObject()

    delete lobbyObject._id
    delete lobbyObject.isPrivate
    delete lobbyObject.createdAt
    delete lobbyObject.updatedAt
    delete lobbyObject.__v

    if (lobbyObject.players) {
        lobbyObject.players = lobbyObject.players.map(p => ({
            playerName: p.playerName
        }));
    }

    return lobbyObject
}

const Lobby = mongoose.model('Lobby', lobbySchema)

module.exports = Lobby