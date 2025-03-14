const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env.dev') });

const mongoose = require('mongoose')

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL

mongoose.connect(`${DB_CONNECTION_URL}`)