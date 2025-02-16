const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserStats = require('./userStats');
const AppError = require('../errors/Error');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Email is invalid'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate: {
            validator: (value) => validator.isStrongPassword(value, { minLength: 7, minNumbers: 0, minLowercase: 0, minUppercase: 1, minSymbols: 1 }),
            message: 'Password is invalid'
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    password_reset_token: {
        type: String,
        required: false
    },
    password_reset_expiration: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
})

// Bind relationship w/ UserStats
userSchema.virtual('stats', {
    ref: 'UserStats',
    localField: '_id',
    foreignField: 'user'
})

// Delete UserStats when deleting User
userSchema.pre('remove', async function (next) {
    const user = this
    await UserStats.deleteOne({ user: user._id })

    next()
})

// Encode password before saving
userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    if (this.password_reset_token && this.isModified('password_reset_token')) {
        this.password_reset_token = await bcrypt.hash(this.password_reset_token, 8)
    }

    next()
})

// statics: Model functions
// methods: Instance functions

// Authenticate with credentials
userSchema.statics.authenticate = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError('Unable to login', 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new AppError('Unable to login', 401)
    }

    return user
}

// Generate bearer token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// Model custom JSON 
userSchema.methods.toJSON = function () {
    const userObject = this.toObject()

    delete userObject._id
    delete userObject.password
    delete userObject.tokens
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v

    return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User