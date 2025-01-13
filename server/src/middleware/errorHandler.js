const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

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

const globalErrorHandler = (err, req, res, next) => {
    err.status = err.status || 500;
    if (process.env.NODE_ENV === "development") {
        developmentError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        productionError(err, res);
    }
};

module.exports = globalErrorHandler;