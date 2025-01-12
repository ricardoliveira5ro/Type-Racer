const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
})

// Encode password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

// statics: Model functions
// methods: Instance functions

// Generate bearer token
userSchema.methods.generateAuthToken = async () => {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User