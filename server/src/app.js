const path = require('path')
const http = require('http')
const express = require('express')

require('./db/mongoose')

const app = express()

//const cors = require('cors');

//app.use(cors());
app.use(express.json());

const server = http.createServer(app)

// API routes
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// Handler for React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

module.exports = server