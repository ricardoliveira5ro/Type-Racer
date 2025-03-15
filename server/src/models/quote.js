const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// Model custom JSON 
quoteSchema.methods.toJSON = function() {
    const quoteObject = this.toObject()

    delete quoteObject._id
    delete quoteObject.createdAt
    delete quoteObject.updatedAt
    delete quoteObject.__v

    return quoteObject
}

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote