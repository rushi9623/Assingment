const express = require("express");
const cors = require("cors");
const connectDB = require("./db/dbConnection");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Allow CORS for all origins (adjust this for production as necessary)
app.use(cors({
    origin: '*', // Allow all origins for development purposes
}));

// JSON middleware
app.use(express.json());

connectDB(); // Connect to MongoDB

// Use the product routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Roxiler API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
