const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env') });

const mongoose = require('mongoose')

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL

console.log('Connecting to db...')

// mongoose.connect(`${DB_CONNECTION_URL}`)

mongoose.connect(DB_CONNECTION_URL, {
    serverSelectionTimeoutMS: 120000, // 120 seconds
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

console.log('Connected successfully')