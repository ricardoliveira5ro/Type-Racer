const path = require('path')
const http = require('http')
const cookieParser = require('cookie-parser');
const express = require('express')

const globalErrorHandler = require('./middleware/errorHandler')

const userRoutes = require('./routes/user')

require('./db/mongoose')

const app = express()

const cors = require('cors');

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const server = http.createServer(app)

// API routes
app.use('/api/users', userRoutes);

// Error Handler
app.use(globalErrorHandler)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// Handler for React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

module.exports = server