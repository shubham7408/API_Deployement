const mongoose = require("mongoose");

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.URI)
        console.log("MongoDB connected:", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;