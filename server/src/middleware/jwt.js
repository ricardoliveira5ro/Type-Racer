const AppError = require('../errors/Error')

const jwtMiddleware = (req, res, next) => {
    const headerPayload = req.cookies['type-racer-header-payload'];
    const signature = req.cookies['type-racer-signature'];

    if (!headerPayload || !signature) {
        return next(new AppError('Authentication required', 401));
    }

    const token = `${headerPayload}.${signature}`

    req.headers.authorization = `Bearer ${token}`
    next()
}

module.exports = jwtMiddleware;