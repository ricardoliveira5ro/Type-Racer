const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env') });

const mongoose = require('mongoose')

console.log("DB_CONNECTION_URL: ", process.env.DB_CONNECTION_URL);

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL

mongoose.connect(`${DB_CONNECTION_URL}`)