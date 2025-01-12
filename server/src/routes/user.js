const express = require('express')
const router = new express.Router()

const User = require('../models/user')

// Sign Up
router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router