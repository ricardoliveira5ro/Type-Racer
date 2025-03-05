const jwtMiddleware = require('./jwt')
const authMiddleware = require('./auth')

const guestMiddleware = (req, res, next) => {
    if (req.headers['x-guest']) {
        return next() // Skip authentication middlewares
    }

    return jwtMiddleware(req, res, (err) => {
        if (err) return next(err)
        authMiddleware(req, res, next)
    });
}

module.exports = guestMiddleware;