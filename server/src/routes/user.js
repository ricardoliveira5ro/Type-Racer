const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const express = require('express')
const router = new express.Router()

const jwtMiddleware = require('../middleware/jwt')
const authMiddleware = require('../middleware/auth')

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
router.get('/token', [jwtMiddleware, authMiddleware], async (req, res, next) => {
    res.send({ user: req.user })
    next()
})

router.get('/logout', [jwtMiddleware, authMiddleware], async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        req.user.tokens = req.user.tokens.filter((t) => {
            return t.token !== token
        })

        await req.user.save()

        res.clearCookie("type-racer-header-payload")
        res.clearCookie("type-racer-signature");

        res.send({ message: "Logout successful" })

    } catch (e) {
        next(e)
    }
})

module.exports = router