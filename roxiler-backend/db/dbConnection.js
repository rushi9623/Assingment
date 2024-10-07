const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://rushi2775:rushi2775@backendroxiler.f7e3l.mongodb.net/?retryWrites=true&w=majority&appName=backendRoxiler";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);  // No need for deprecated options
        console.log("MongoDB connection established");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process if there's a connection error
    }
};

module.exports = connectDB;
