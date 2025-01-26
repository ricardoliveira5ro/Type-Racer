const express = require('express')
const router = new express.Router()

const User = require('../models/user')

// Sign Up
router.post('/users/signup', async (req, res, next) => {
    const user = new User(req.body)

    try {
        await user.save()

        res.send({ user })

    } catch (e) {
        next(e)
    }
})

// Login
router.post('/users/login', async (req, res, next) => {
    try {
        const user = await User.authenticate(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        const [header, payload, signature] = token.split('.')

        res.cookie('type-racer-header-payload', `${header}.${payload}`, {
            httpOnly: false,
            secure: false, // For localhost should be false
            sameSite: 'Strict'
        })
        res.cookie('type-racer-signature', `${signature}`, {
            httpOnly: true,
            secure: false, // For localhost should be false
            sameSite: 'Strict'
        })
        res.send({ user })

    } catch (e) {
        next(e)
    }
})

module.exports = router