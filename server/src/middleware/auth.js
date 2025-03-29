const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env') });

const jwt = require('jsonwebtoken');

const AppError = require('../errors/Error')
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
        res.clearCookie("type-racer-header-payload")
        res.clearCookie("type-racer-signature")
        
        return next(new AppError('Please authenticate', 401))
    }

    req.user = user
    next()
}

module.exports = authMiddleware;