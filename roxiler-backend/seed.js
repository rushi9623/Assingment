// seed.js
const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("./models/Product");

const MONGODB_URI = "mongodb+srv://rushi2775:rushi2775@backendroxiler.f7e3l.mongodb.net/?retryWrites=true&w=majority&appName=backendRoxiler";

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connection established for seeding.");

        // Clear existing data
        await Product.deleteMany({});  // This line removes all existing products

        // Fetch data from the third-party API
        const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const data = response.data;

        // Insert each item into the MongoDB collection
        const formattedData = data.map(item => ({
            ...item,
            dateOfSale: new Date(item.dateOfSale), // Convert to Date object
        }));

        await Product.insertMany(formattedData);

        console.log("Data seeded successfully!");
    } catch (error) {
        console.error("Error seeding data:", error.message);
    } finally {
        await mongoose.disconnect(); // Close the connection
    }
};

seedData();
