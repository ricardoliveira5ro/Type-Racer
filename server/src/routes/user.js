const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const express = require('express')
const router = new express.Router()

const jwtMiddleware = require('../middleware/jwt')
const authMiddleware = require('../middleware/auth')
const resetMiddleware = require('../middleware/resetMiddleware')

const { Resend } = require('resend')
const { randomUUID } = require('crypto')

const AppError = require('../errors/Error');

const User = require('../models/user');
const UserStats = require('../models/userStats');

// Sign Up
router.post('/signup', async (req, res, next) => {
    const user = new User(req.body)
    const userStats = new UserStats({ user: user._id })

    try {
        await user.save()
        await userStats.save()

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
    try {
        res.send({ user: req.user })
    } catch (e) {
        next(e)
    }
})

// Verify reset token
router.get('/reset-token', resetMiddleware, async (req, res, next) => {
    try {
        res.send({ message: "Verified" })
    } catch (e) {
        next(e)
    }
})

// Logout
router.post('/logout', [jwtMiddleware, authMiddleware], async (req, res, next) => {
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

// Profile
router.get('/profile', [jwtMiddleware, authMiddleware], async (req, res, next) => {
    try {
        const user = req.user.toObject()
        const stats = await UserStats.findOne({ user: user._id })
        user.stats = stats

        res.send({ user: user })

    } catch (e) {
        next(e)
    }
})

// Update password
router.put('/password', [jwtMiddleware, authMiddleware], async (req, res, next) => {
    try {
        await User.authenticate(req.user.email, req.body.oldPassword)

        req.user.password = req.body.newPassword
        await req.user.save()

        res.send({ message: "Update successful" })

    } catch (e) {
        next(e)
    }
})

// Password recovery
router.post('/recovery', async (req, res, next) => {
    try {
        const userEmail = req.body.email
        const user = await User.findOne({ email: userEmail })

        if (!user) {
            throw new AppError("User not found", 404)
        }

        const uuid = randomUUID()
        user.password_reset_token = uuid
        user.password_reset_expiration = Date.now() + 1*60*60*1000 // 1 hour

        await user.save()

        const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "to-be-changed"
        const link = `<a href="${domain}/reset-password?user=${user.username}&reset_token=${uuid}">link</a>`

        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: 'type-racer.support@resend.dev',
            to: userEmail,
            subject: 'Password recovery',
            html: `<p>To recover and reset your password follow this ${link}</p>`
        });

        if (data.error) {
            throw new AppError(data.error.message, data.error.statusCode)
        }

        res.send({ message: "Recovery email sent" })

    } catch (e) {
        next(e)
    }
})

module.exports = router