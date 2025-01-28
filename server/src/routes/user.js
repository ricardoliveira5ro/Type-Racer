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

        res.cookie('type-racer-header-payload', `${header}.${payload}`, {
            httpOnly: false,
            secure: false, // For localhost should be false
            sameSite: 'Lax' // For localhost should be 'Lax' (different domain) / Strict
        })
        res.cookie('type-racer-signature', `${signature}`, {
            httpOnly: true,
            secure: false, // For localhost should be false
            sameSite: 'Lax' // For localhost should be 'Lax' (different domain) / Strict
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