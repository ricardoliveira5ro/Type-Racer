const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const AppError = require('../errors/Error')

const developmentError = (err, res) => {
    res.status(err.status).send({
        message: err.message,
        stack: err.stack
    })
}

const productionError = (err, res) => {
    if (err.isOperational) {
        res.status(err.status).send({
            message: err.message
        })

    } else {
        res.status(500).send({
            message: "Something went wrong!",
        })
    }
}

const duplicatedIndexError = (err) => {
    const field = err.message.match(/dup key: \{ ([^:]+):/)[1];
    const value = err.message.match(/dup key: \{ [^:]+: ["'](.+?)["'] \}/)?.[1];
    const message = `Field '${field}' with value '${value}' already exists`;

    return new AppError (message, 400);
}

const validationError = (err) => {
    const errors = Object.values(err.errors).map(e => e.message)
    const message = `Invalid data. ${errors.join(". ")}`

    return new AppError (message, 400);
}

const globalErrorHandler = (err, req, res, next) => {
    err.status = err.status || 500;

    if (err.code === 11000) err = duplicatedIndexError(err)
    if (err. name === "ValidationError") err = validationError (err)

    if (process.env.NODE_ENV === "development") {
        developmentError(err, res);

    } else if (process.env.NODE_ENV === "production") {
        //if (err.code === 11000) err = duplicatedIndexError(err);
        productionError(err, res);
    }
};

module.exports = globalErrorHandler;