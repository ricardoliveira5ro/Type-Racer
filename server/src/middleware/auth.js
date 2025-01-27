const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const jwt = require('jsonwebtoken');

const AppError = require('../errors/Error')
const User = require('../models/user');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
        throw new AppError('Please authenticate', 401)
    }

    req.user = user
    next()
}

module.exports = auth;