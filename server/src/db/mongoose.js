const mongoose = require('mongoose')

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL

mongoose.connect(`${DB_CONNECTION_URL}`)