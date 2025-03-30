require("dotenv").config({ path: __dirname + `/config/.env` });

const connectDB = require('./db/mongoose')
const app = require('./app')

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        process.exit(1); // Stop the process if DB connection fails
    }
};

startServer();