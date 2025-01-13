const express = require('express')
const router = new express.Router()

const User = require('../models/user')

// Sign Up
router.post('/users/signup', async (req, res, next) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (e) {
        next(e)
    }
})

// Login
router.post('/users/login', async (req, res, next) => {
    try {
        const user = await User.authenticate(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })

    } catch (e) {
        next(e)
    }
})

module.exports = router