const bcrypt = require('bcrypt')

const AppError = require('../errors/Error')
const User = require('../models/user')

const resetMiddleware = async (req, res, next) => {
    const username = req.query.user
    const resetToken = req.query.reset_token

    const user = await User.findOne({ username: username })
    if (!user) {
        return next(new AppError('User not found', 404))
    }

    if (!user.password_reset_token) {
        return next(new AppError('Invalid reset token', 401))
    }

    const isMatch = await bcrypt.compare(resetToken, user.password_reset_token)
    if (!isMatch) {
        return next(new AppError('Invalid reset token', 401))
    }

    if (Date.now() > user.password_reset_expiration) {
        user.password_reset_token = undefined
        user.password_reset_expiration = undefined
        await user.save()

        return next(new AppError('Reset token expired', 401))
    }

    req.user = user
    next()
}

module.exports = resetMiddleware;