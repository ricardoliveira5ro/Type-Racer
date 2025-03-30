const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env') });

const mongoose = require('mongoose')

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL

const connectDB = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_URL, {
            serverSelectionTimeoutMS: 120000,  // Increase timeout
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Stop the app if DB fails to connect
    }
}

module.exports = connectDB;