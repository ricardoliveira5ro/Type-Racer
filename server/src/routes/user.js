const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const express = require('express')
const router = new express.Router()

const jwtMiddleware = require('../middleware/jwt')
const auth = require('../middleware/auth')

const User = require('../models/user')

// Sign Up
router.post('/signup', async (req, res, next) => {
    const user = new User(req.body)

    try {
        await user.save()

        res.send({ user })

    } catch (e) {
        next(e)
    }
})

// Login
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.authenticate(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        const [header, payload, signature] = token.split('.')

        const isProduction = process.env.NODE_ENV === "production"
        res.cookie('type-racer-header-payload', `${header}.${payload}`, {
            httpOnly: false,
            secure: isProduction ? true : false,
            sameSite: isProduction ? 'Strict' : 'Lax'
        })
        res.cookie('type-racer-signature', `${signature}`, {
            httpOnly: true,
            secure: isProduction ? true : false,
            sameSite: isProduction ? 'Strict' : 'Lax'
        })
        res.send({ user })

    } catch (e) {
        next(e)
    }
})

// Verify token authenticity 
router.get('/token', [jwtMiddleware, auth], async (req, res, next) => {
    res.send({ user: req.user })
    next()
})

module.exports = router